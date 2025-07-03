import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import RecommendItem from '../components/RecommendItem';

const MarketScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('전체상품');

  const categories = [
    '전체상품',
    '식품',
    '기프트',
    '생활용품',
    'コスメ',
    'ファッション',
    '雑貨グッズ',
    '新着商品',
    'ぶくの자동판매기'
  ];

  const featuredProducts = [
    { id: 1, name: '【アラサン】洗顔フォーム', price: 2500, category: 'コスメ' },
    { id: 2, name: '【アラサン】美容フェイシャル', price: 500, category: 'コスメ' },
    { id: 3, name: '【アラサン】スタイル', price: 1500, category: 'ファッション' },
  ];

  const goToProductDetail = (product: any) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentScroll}>
        {/* 이벤트 배너와 사이드바 섹션 */}
        <View style={styles.topSection}>
          {/* 사이드바 */}
          <View style={styles.sidebar}>
            <View style={styles.categoryList}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category && styles.selectedCategory,
                    index === categories.length - 1 && styles.lastCategoryItem
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                    index === categories.length - 1 && styles.lastCategoryText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 이벤트 배너 */}
          <View style={styles.eventBanner}>
            <Text style={styles.eventMonth}>6月</Text>
            <Text style={styles.eventTitle}>イベント</Text>
            <Text style={styles.eventSubtitle}>開催中！</Text>
            <Text style={styles.eventDescription}>この夏こそ美しく上質に。</Text>
            
            {/* 이곳에 사진을 넣으실 수 있습니다 */}
            <View style={styles.bannerImagePlaceholder}>
              <Text style={styles.placeholderText}>여기에 사진을 넣어주세요</Text>
            </View>
          </View>
        </View>

        {/* 추천 상품 섹션 */}
        <View style={styles.recommendedSection}>
          <Text style={styles.sectionTitle}>最近気になったおすすめの洗顔用品</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productHorizontalList}>
            {featuredProducts.map((product) => (
              <TouchableOpacity 
                key={product.id}
                style={styles.productCard}
                onPress={() => goToProductDetail(product)}
              >
                {/* 상품 이미지 placeholder */}
                <View style={styles.productImagePlaceholder}>
                  <Text style={styles.imagePlaceholder}>사진</Text>
                </View>
                
                <View style={styles.productInfo}>
                  <Text style={styles.productBrand}>商</Text>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price.toLocaleString()}円</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 하단 추천 상품 */}
        <View style={styles.bottomRecommendSection}>
          <View style={styles.recommendItem}>
            <View style={styles.recommendImagePlaceholder}>
              <Text style={styles.imagePlaceholder}>상품사진</Text>
            </View>
            <View style={styles.recommendInfo}>
              <View style={styles.recommendInfoText}>
              <Text style={styles.recommendDescription}>こういう商品をどうですか？</Text>
              <Text style={styles.recommendPrice}>2,500円</Text>
              </View>
              <Text style={styles.recommendTitle}>株式会社新電機製作所 ナチュラルシャンプー</Text>
            </View>
          </View>

          <Text style={styles.question}>何かおすすめしてほしいものはありますか？</Text>
          
          <TouchableOpacity style={styles.requestButton}>
            <Text style={styles.requestButtonText}>シャンプー</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentScroll: {
    flex: 1,
  },
  topSection: {
    flexDirection: 'row',
    height: 335,
  },
  sidebar: {
    width: 120,
    backgroundColor: '#FF6B35',
  },
  categoryList: {
    flex: 1,
    height: '100%',
  },
  categoryItem: {
    height: '11.11%', // 9개 항목이므로 각각 약 11.11%
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  selectedCategory: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedCategoryText: {
    fontWeight: 'bold',
  },
  lastCategoryItem: {
    height: '11.11%',
    borderBottomWidth: 0,
  },
  lastCategoryText: {
    fontSize: 12,
    lineHeight: 14,
  },
  eventBanner: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventMonth: {
    color: '#FF6B35',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventTitle: {
    color: '#333',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventSubtitle: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDescription: {
    color: '#666',
    fontSize: 16,
    marginBottom: 20,
  },
  bannerImagePlaceholder: {
    width: '80%',
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 14,
  },
  recommendInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },  
  recommendedSection: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  sectionTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  productHorizontalList: {
    marginBottom: 20,
  },
  productCard: {
    borderRadius: 10,
    marginRight: 15,
    padding: 15,
    width: 150,
  },
  productImagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#555',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePlaceholder: {
    height: 141, 
    width: 92,
    fontSize: 14,
  },
  productInfo: {
    alignItems: 'center',
  },
  productBrand: {
    color: '#FF6B35',
    fontSize: 12,
    marginBottom: 5,
  },
  productName: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
  },
  productPrice: {
    color: '#FF6B35',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomRecommendSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  recommendItem: {
    flexDirection: 'row',
    backgroundColor:"#FCFAF6",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  recommendImagePlaceholder: {
    width: 60,
    height: 95,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  recommendInfo: {
    borderRadius: 10,
    flex: 1,
  },
  recommendPrice: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  recommendTitle: {
    color: '#333',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  question: {
    color: '#333',
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'left',
  },
  requestButton: {
    backgroundColor: '#e0e0e0',
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: 'center',
  },
  requestButtonText: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',  
    fontWeight: '500',
  },
});

export default MarketScreen; 