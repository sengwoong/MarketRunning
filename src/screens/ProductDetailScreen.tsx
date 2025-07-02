import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';

const ProductDetailScreen = ({ navigation, route }: any) => {
  const { product } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    setInCart(!inCart);
    Alert.alert(
      inCart ? '장바구니에서 제거' : '장바구니에 추가',
      inCart ? '상품이 장바구니에서 제거되었습니다.' : '상품이 장바구니에 추가되었습니다.'
    );
  };

  const handlePurchase = () => {
    Alert.alert(
      '구매 완료',
      `${product.name}을(를) ${product.price}원에 구매했습니다!`,
      [{ text: '확인', onPress: () => navigation.goBack() }]
    );
  };

  const getProductDescription = () => {
    switch (product.category) {
      case 'drink':
        return '운동 후 에너지 보충에 완벽한 음료입니다. 천연 재료로 만들어져 건강에도 좋습니다.';
      case 'food':
        return '고품질 영양소가 풍부한 건강식품입니다. 운동 전후 섭취하면 효과적입니다.';
      case 'gear':
        return '운동할 때 필수적인 장비입니다. 내구성이 뛰어나고 사용하기 편리합니다.';
      case 'supplement':
        return '일일 필수 영양소를 보충해주는 건강보조식품입니다.';
      default:
        return '고품질의 우수한 상품입니다.';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← 뒤로</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Text style={styles.likeButtonText}>
              {isLiked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 상품 이미지 */}
        <View style={styles.productImageContainer}>
          <View style={styles.productImage}>
            <Text style={styles.productEmoji}>{product.emoji}</Text>
          </View>
        </View>

        {/* 상품 정보 */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price.toLocaleString()}원</Text>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>상품 설명</Text>
            <Text style={styles.description}>{getProductDescription()}</Text>
          </View>

          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>고객 리뷰</Text>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewRating}>⭐⭐⭐⭐⭐</Text>
              <Text style={styles.reviewText}>"정말 좋은 상품이에요!"</Text>
              <Text style={styles.reviewAuthor}>- 김운동</Text>
            </View>
            <View style={styles.reviewItem}>
              <Text style={styles.reviewRating}>⭐⭐⭐⭐</Text>
              <Text style={styles.reviewText}>"가격 대비 만족스럽습니다."</Text>
              <Text style={styles.reviewAuthor}>- 박헬스</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 하단 액션 버튼들 */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[styles.cartButton, inCart && styles.cartButtonActive]} 
          onPress={handleAddToCart}
        >
          <Text style={[styles.actionButtonText, inCart && styles.actionButtonTextActive]}>
            {inCart ? '장바구니에서 제거' : '장바구니 담기'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
          <Text style={styles.actionButtonText}>구매하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  likeButton: {
    padding: 5,
  },
  likeButtonText: {
    fontSize: 24,
  },
  productImageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  productEmoji: {
    fontSize: 80,
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#FF6B35',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  reviewContainer: {
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reviewItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewRating: {
    fontSize: 16,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  reviewAuthor: {
    fontSize: 12,
    color: '#999',
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 10,
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#ddd',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartButtonActive: {
    backgroundColor: '#FF6B35',
  },
  purchaseButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtonTextActive: {
    color: 'white',
  },
});

export default ProductDetailScreen; 