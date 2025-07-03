import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { shopService, cartService, Item } from '../services';

interface ProductDetailScreenProps {
  navigation: any;
  route: {
    params: {
      product?: Item;
      productId?: number;
    };
  };
}

export default function ProductDetailScreen({ navigation, route }: ProductDetailScreenProps) {
  const [quantity, setQuantity] = useState('1');
  const [product, setProduct] = useState<Item | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartItemId, setCartItemId] = useState<number | null>(null);

  // route에서 상품 정보 또는 상품 ID 가져오기
  const initialProduct = route.params?.product;
  const productId = route.params?.productId || initialProduct?.id;

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      loadRelatedProducts();
      checkCartStatus(initialProduct.id);
      setLoading(false);
    } else if (productId) {
      loadProductDetail(productId);
    }
  }, [productId, initialProduct]);

  const checkCartStatus = async (itemId: number) => {
    try {
      const cart = await cartService.getCart();
      const cartItem = cart.items.find(item => item.item_id === itemId);
      if (cartItem) {
        setIsInCart(true);
        setCartItemId(cartItem.id);
      } else {
        setIsInCart(false);
        setCartItemId(null);
      }
    } catch (error) {
      console.log('장바구니 상태 확인 실패:', error);
      setIsInCart(false);
      setCartItemId(null);
    }
  };

  const loadProductDetail = async (id: number) => {
    try {
      setLoading(true);
      const productData = await shopService.getItem(id);
      setProduct(productData);
      await loadRelatedProducts();
      await checkCartStatus(id);
    } catch (error: any) {
      Alert.alert('오류', error.message || '상품 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async () => {
    try {
      const allProducts = await shopService.getItems();
      // 현재 상품을 제외한 다른 상품들을 관련 상품으로 표시 (최대 3개)
      const related = allProducts
        .filter(item => item.id !== productId)
        .slice(0, 3);
      setRelatedProducts(related);
    } catch (error) {
      console.log('관련 상품 로드 실패:', error);
    }
  };

  const handlePurchase = async () => {
    if (!product) return;

    try {
      setPurchasing(true);
      await shopService.purchaseItem({
        item_id: product.id,
        quantity: parseInt(quantity)
      });
      
      Alert.alert(
        '구매 완료',
        `${product.name}을(를) ${quantity}개 구매했습니다!`,
        [{ text: '확인', onPress: () => navigation.goBack() }]
      );
    } catch (error: any) {
      Alert.alert('구매 실패', error.message || '구매에 실패했습니다.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAddingToCart(true);
      
      if (isInCart && cartItemId) {
        // 장바구니에서 제거
        await cartService.removeCartItem(cartItemId);
        setIsInCart(false);
        setCartItemId(null);
        Alert.alert('장바구니 제거', '상품이 장바구니에서 제거되었습니다!');
      } else {
        // 장바구니에 추가
        const cartItem = await cartService.addToCart({
          item_id: product.id,
          quantity: parseInt(quantity)
        });
        setIsInCart(true);
        setCartItemId(cartItem.id);
        Alert.alert('장바구니 추가', '상품이 장바구니에 추가되었습니다!');
      }
    } catch (error: any) {
      Alert.alert(
        isInCart ? '장바구니 제거 실패' : '장바구니 추가 실패', 
        error.message || (isInCart ? '장바구니 제거에 실패했습니다.' : '장바구니 추가에 실패했습니다.')
      );
    } finally {
      setAddingToCart(false);
    }
  };

  const goToProductDetail = (relatedProduct: Item) => {
    navigation.push('ProductDetail', { product: relatedProduct });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>상품 정보를 불러오는 중...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>상품 정보를 찾을 수 없습니다.</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* 메인 상품 */}
      <View style={styles.mainProduct}>
        {/* 왼쪽: 이미지 */}
        <View style={styles.productImageContainer}>
          {product.image_url ? (
            <Image
              source={{ uri: product.image_url }}
              style={styles.productImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>상품 이미지</Text>
            </View>
          )}
        </View>
        
        {/* 오른쪽: 정보 및 버튼 */}
        <View style={styles.productInfoColumn}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <View style={styles.underline} />

          {product.description && (
            <Text style={styles.description}>{product.description}</Text>
          )}

          <Text style={styles.price}>{product.point_price.toLocaleString()}P</Text>
          
          <View style={styles.productPriceColumn}>
            <View style={styles.pickerContainerRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
                <View style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
                  width: 80,
                  height: 32,
                  overflow: 'hidden',
                  justifyContent: 'center',
                }}>
                  <Picker
                    selectedValue={quantity}
                    onValueChange={(itemValue) => setQuantity(itemValue)}
                    style={{
                      height: 32,
                      fontSize: 14,
                      marginTop: -4,
                    }}
                    dropdownIconColor="#333"
                    mode="dropdown"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <Picker.Item 
                        key={num} 
                        label={`${num}개`} 
                        value={num.toString()} 
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
    
            <TouchableOpacity 
              style={[styles.buyButtonRow, purchasing && styles.disabledButton]}
              onPress={handlePurchase}
              disabled={purchasing}
            >
              <Text style={styles.buyTextRow}>
                {purchasing ? '구매 중...' : '구매'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                isInCart ? styles.cartButtonRowCancel : styles.cartButtonRow, 
                addingToCart && styles.disabledButton
              ]}
              onPress={handleAddToCart}
              disabled={addingToCart}
            >
              <Text style={isInCart ? styles.cartTextRowCancel : styles.cartTextRow}>
                {addingToCart 
                  ? (isInCart ? '제거 중...' : '추가 중...') 
                  : (isInCart ? '장바구니 취소' : '장바구니')
                }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 관련상품 */}
      {relatedProducts.length > 0 && (
        <>
          <Text style={styles.relatedTitle}>관련 상품은 어떠세요?</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.relatedScroll} 
            contentContainerStyle={styles.relatedProducts}
          >
            {relatedProducts.map((relatedProduct) => (
              <ProductCard 
                key={relatedProduct.id}
                product={relatedProduct}
                onPress={() => goToProductDetail(relatedProduct)}
              />
            ))}
          </ScrollView>
        </>
      )}

      <Text style={styles.bottomText}>
        추천이 마음에 들지 않으시나요?{'\n'}상담 대응도 가능합니다. 언제든 문의해 주세요.
      </Text>
    </ScrollView>
  );
}

function ProductCard({ product, onPress }: { product: Item; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {product.image_url ? (
        <Image source={{ uri: product.image_url }} style={styles.cardImage} />
      ) : (
        <View style={styles.cardPlaceholderImage}>
          <Text style={styles.cardPlaceholderText}>이미지</Text>
        </View>
      )}
      <Text style={styles.cardName} numberOfLines={2}>{product.name}</Text>
      <Text style={styles.cardPrice}>{product.point_price.toLocaleString()}P</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
    minHeight: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mainProduct: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    gap: 24,
  },
  productImageContainer: {
    width: 180,
    height: 270,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  productPriceColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 4,
  },
  productInfoColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
    marginLeft: 12,
    marginTop: 2,
  },
  productTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 2,
    color: '#222',
    fontWeight: '500',
    lineHeight: 20,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    marginBottom: 4,
    color: '#FF6B35',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  pickerContainerRow: {
    width: 90,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
    marginRight: 0,
    justifyContent: 'center',
    marginBottom: 4,
  },
  buyButtonRow: {
    backgroundColor: '#F08359',
    width: 100,
    height: 32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyTextRow: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cartButtonRow: {
    backgroundColor: '#FED950',
    width: 100,
    height: 32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonRowCancel: {
    backgroundColor: '#FF6B6B',
    width: 100,
    height: 32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartTextRow: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 15,
  },
  cartTextRowCancel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 10,
    color: '#222',
  },
  relatedScroll: {
    marginBottom: 0,
  },
  relatedProducts: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 10,
  },
  card: {
    width: 110,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#eee',
    marginBottom: 6,
    resizeMode: 'cover',
  },
  cardPlaceholderImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPlaceholderText: {
    color: '#999',
    fontSize: 10,
  },
  cardName: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 4,
    color: '#222',
    lineHeight: 15,
  },
  cardPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B35',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 32,
    color: '#888',
    marginBottom: 16,
    lineHeight: 16,
  },
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 6,
    borderRadius: 1,
  },
});
