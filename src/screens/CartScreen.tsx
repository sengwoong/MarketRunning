import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import { CartSummary, CartItem } from '../types/api';
import { cartService, shopService } from '../services';
import { useAuth } from '../context/AuthContext';
import { formatPoints, formatNumber } from '../utils/formatters';

const { width } = Dimensions.get('window');

const CartScreen: React.FC = () => {
  const [cart, setCart] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingItem, setProcessingItem] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [purchasing, setPurchasing] = useState(false);
  const { user } = useAuth();

  const loadCart = useCallback(async () => {
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error('장바구니 조회 실패:', error);
      Alert.alert('오류', '장바구니를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCart();
    setRefreshing(false);
  }, [loadCart]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setProcessingItem(cartItemId);
    try {
      await cartService.updateCartItem(cartItemId, { quantity: newQuantity });
      await loadCart(); // 장바구니 새로고침
    } catch (error) {
      console.error('수량 변경 실패:', error);
      Alert.alert('오류', '수량 변경에 실패했습니다.');
    } finally {
      setProcessingItem(null);
    }
  };

  const handleRemoveItem = async (cartItemId: number, itemName: string) => {
    Alert.alert(
      '상품 삭제',
      `${itemName}을(를) 장바구니에서 삭제하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            setProcessingItem(cartItemId);
            try {
              await cartService.removeCartItem(cartItemId);
              await loadCart();
            } catch (error) {
              console.error('상품 삭제 실패:', error);
              Alert.alert('오류', '상품 삭제에 실패했습니다.');
            } finally {
              setProcessingItem(null);
            }
          },
        },
      ]
    );
  };

  const handleClearCart = async () => {
    Alert.alert(
      '장바구니 비우기',
      '모든 상품을 장바구니에서 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await cartService.clearCart();
              await loadCart();
              // 쿠폰도 초기화
              setAppliedCoupon(null);
              setDiscountAmount(0);
              setCouponCode('');
            } catch (error) {
              console.error('장바구니 비우기 실패:', error);
              Alert.alert('오류', '장바구니 비우기에 실패했습니다.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      Alert.alert('알림', '쿠폰 코드를 입력해주세요.');
      return;
    }

    try {
      // TODO: API 연결 후 실제 쿠폰 검증 로직 추가
      // 임시로 하드코딩된 쿠폰들
      const mockCoupons = {
        'WELCOME10': { name: '신규 회원 10% 할인', discount: 0.1, type: 'percentage' },
        'SAVE100': { name: '100P 할인', discount: 100, type: 'fixed' },
        'CATEGORY20': { name: '카테고리 20% 할인', discount: 0.2, type: 'percentage' }
      };

      const coupon = mockCoupons[couponCode.toUpperCase() as keyof typeof mockCoupons];
      if (!coupon) {
        Alert.alert('오류', '유효하지 않은 쿠폰 코드입니다.');
        return;
      }

      if (cart) {
        let discount = 0;
        if (coupon.type === 'percentage') {
          discount = Math.floor(cart.total_points * coupon.discount);
        } else {
          discount = coupon.discount;
        }
        
        setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
        setDiscountAmount(discount);
        Alert.alert('쿠폰 적용', `${coupon.name}이 적용되었습니다!`);
      }
    } catch (error) {
      console.error('쿠폰 적용 실패:', error);
      Alert.alert('오류', '쿠폰 적용에 실패했습니다.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode('');
  };

  const handlePurchase = async () => {
    if (!cart || cart.items.length === 0) {
      Alert.alert('알림', '장바구니가 비어있습니다.');
      return;
    }

    const finalAmount = cart.total_points - discountAmount;
    
    if (!user || user.points < finalAmount) {
      Alert.alert('포인트 부족', '보유 포인트가 부족합니다.');
      return;
    }

    Alert.alert(
      '구매 확인',
      `총 ${formatNumber(finalAmount)}P로 구매하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '구매',
          onPress: async () => {
            setPurchasing(true);
            try {
              // 각 상품별로 구매 API 호출
              for (const item of cart.items) {
                await shopService.purchaseItem({
                  item_id: item.item_id,
                  quantity: item.quantity
                });
              }
              
              // 장바구니 비우기
              await cartService.clearCart();
              
              Alert.alert('구매 완료', '성공적으로 구매되었습니다!', [
                { text: '확인', onPress: () => {
                  setCart(null);
                  setAppliedCoupon(null);
                  setDiscountAmount(0);
                  setCouponCode('');
                  loadCart();
                }}
              ]);
            } catch (error: any) {
              console.error('구매 실패:', error);
              Alert.alert('구매 실패', error.message || '구매에 실패했습니다.');
            } finally {
              setPurchasing(false);
            }
          }
        }
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImageContainer}>
        <Image
          source={{ uri: item.item.image_url || 'https://via.placeholder.com/80' }}
          style={styles.itemImage}
        />
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.item.name}</Text>
        {item.item.description && (
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.item.description}
          </Text>
        )}
        <View style={styles.itemMeta}>
          <Text style={styles.itemPrice}>{item.item.point_price}P</Text>
          <Text style={styles.itemCategory}>{item.item.category}</Text>
        </View>
      </View>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={[styles.quantityButton, { opacity: item.quantity <= 1 ? 0.5 : 1 }]}
          onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1 || processingItem === item.id}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
          disabled={processingItem === item.id}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.itemActions}>
        <Text style={styles.itemTotal}>
          {formatPoints(item.item.point_price * item.quantity)}
        </Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.id, item.item.name)}
          disabled={processingItem === item.id}
        >
          {processingItem === item.id ? (
            <ActivityIndicator size="small" color="#ff4444" />
          ) : (
            <Text style={styles.removeButtonText}>🗑️</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🛒</Text>
      <Text style={styles.emptyTitle}>장바구니가 비어있습니다</Text>
      <Text style={styles.emptySubtitle}>마켓에서 상품을 둘러보세요!</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>장바구니를 불러오는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>장바구니</Text>
        {cart && cart.items.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
            <Text style={styles.clearButtonIcon}>🗑️</Text>
            <Text style={styles.clearButtonText}>비우기</Text>
          </TouchableOpacity>
        )}
      </View>

      {cart && cart.items.length > 0 ? (
        <>
          <FlatList
            data={cart.items}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.cartList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.footer}>
            {/* 쿠폰 입력 섹션 */}
            <View style={styles.couponSection}>
              <Text style={styles.couponTitle}>쿠폰 사용</Text>
              {!appliedCoupon ? (
                <View style={styles.couponInputContainer}>
                  <TextInput
                    style={styles.couponInput}
                    placeholder="쿠폰 코드를 입력하세요"
                    value={couponCode}
                    onChangeText={setCouponCode}
                    autoCapitalize="characters"
                  />
                  <TouchableOpacity 
                    style={styles.couponApplyButton}
                    onPress={handleApplyCoupon}
                  >
                    <Text style={styles.couponApplyButtonText}>적용</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.appliedCouponContainer}>
                  <View style={styles.appliedCouponInfo}>
                    <Text style={styles.appliedCouponName}>{appliedCoupon.name}</Text>
                    <Text style={styles.appliedCouponCode}>({appliedCoupon.code})</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.removeCouponButton}
                    onPress={handleRemoveCoupon}
                  >
                    <Text style={styles.removeCouponButtonText}>제거</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>총 상품 수:</Text>
                <Text style={styles.summaryValue}>{cart.total_items}개</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>상품 금액:</Text>
                <Text style={styles.summaryValue}>{formatPoints(cart.total_points)}</Text>
              </View>
              {appliedCoupon && (
                <View style={styles.summaryRow}>
                  <Text style={styles.discountLabel}>쿠폰 할인:</Text>
                  <Text style={styles.discountValue}>-{formatPoints(discountAmount)}</Text>
                </View>
              )}
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>최종 결제 금액:</Text>
                <Text style={styles.summaryTotal}>
                  {formatPoints(cart.total_points - discountAmount)}
                </Text>
              </View>
            </View>
            
            <View style={styles.userPointsContainer}>
              <Text style={styles.userPointsLabel}>내 포인트:</Text>
              <Text style={styles.userPoints}>{formatPoints(user?.points || 0)}</Text>
            </View>

            {/* 구매 버튼 */}
            <TouchableOpacity 
              style={[
                styles.purchaseButton, 
                purchasing && styles.purchaseButtonDisabled
              ]}
              onPress={handlePurchase}
              disabled={purchasing}
            >
              {purchasing ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.purchaseButtonText}>
                  {formatPoints(cart.total_points - discountAmount)} 구매하기
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        renderEmptyCart()
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  clearButtonIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  clearButtonText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '600',
  },
  cartList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImageContainer: {
    marginRight: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  itemCategory: {
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  removeButtonText: {
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryContainer: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  summaryTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  userPointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  userPointsLabel: {
    fontSize: 16,
    color: '#666',
  },
  userPoints: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
  },
  couponSection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  couponInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
  },
  couponApplyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  couponApplyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  appliedCouponContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  appliedCouponInfo: {
    flex: 1,
  },
  appliedCouponName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  appliedCouponCode: {
    fontSize: 12,
    color: '#666',
  },
  removeCouponButton: {
    backgroundColor: '#ff4444',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  removeCouponButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  discountLabel: {
    fontSize: 16,
    color: '#ff4444',
    fontWeight: '600',
  },
  discountValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4444',
  },
  totalRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  purchaseButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#ccc',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default CartScreen; 