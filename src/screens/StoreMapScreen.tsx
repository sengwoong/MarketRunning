import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

const StoreMapScreen = ({ navigation }: any) => {
  const stores = [
    { id: 1, name: '강남점', address: '서울시 강남구', emoji: '🏪', x: 60, y: 40 },
    { id: 2, name: '홍대점', address: '서울시 마포구', emoji: '🏪', x: 30, y: 50 },
    { id: 3, name: '명동점', address: '서울시 중구', emoji: '🏪', x: 50, y: 60 },
    { id: 4, name: '잠실점', address: '서울시 송파구', emoji: '🏪', x: 70, y: 70 },
    { id: 5, name: '신촌점', address: '서울시 서대문구', emoji: '🏪', x: 35, y: 45 },
  ];

  const handleStorePress = (store: any) => {
    // 매장 상세 정보 표시
  };

  // 추천 상품 예시
  const recommend = {
    name: '暁機製作所 アカツキ生水 500 ml',
    price: '500円',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    desc: 'こういう商品はどうですか？',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.menu}>≡</Text>
        <Text style={styles.headerText}>shop</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 안내문구 */}
        <Text style={styles.topNotice}>近くの自動販売機を探してみましょう！</Text>

        {/* 지도 이미지 */}
        <View style={styles.mapWrapper}>
          <Image
            source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/10/19/05/map-1974699_1280.png' }}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View>

        {/* 추천 상품 카드 */}
        <View style={styles.recommendCard}>
          <View style={styles.recommendRow}>
            <Image source={{ uri: recommend.image }} style={styles.recommendImage} />
            <View style={styles.recommendInfo}>
              <Text style={styles.recommendDesc}>{recommend.desc}</Text>
              <Text style={styles.recommendPrice}>{recommend.price}</Text>
              <Text style={styles.recommendName}>{recommend.name}</Text>
            </View>
          </View>
        </View>

        {/* 버튼 */}
        <TouchableOpacity style={styles.kakoButton}>
          <Text style={styles.kakoButtonText}>kako</Text>
        </TouchableOpacity>

        {/* 하단 안내문구 */}
        <Text style={styles.bottomNotice}>
          おすすめが気に召しませんでしたか？{ '\n' }ご相談対応も可能です。ぜひお問い合わせください。
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  menu: {
    color: '#222',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 24,
    minHeight: '100%',
    alignItems: 'center',
  },
  topNotice: {
    fontSize: 15,
    color: '#222',
    marginTop: 10,
    marginBottom: 12,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 18,
    fontWeight: '400',
  },
  mapWrapper: {
    width: 230,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e6f3ff',
    marginBottom: 18,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  recommendCard: {
    width: 230,
    backgroundColor: '#faf8f6',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  recommendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recommendImage: {
    width: 40,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#eee',
  },
  recommendInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  recommendDesc: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  recommendPrice: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  recommendName: {
    fontSize: 13,
    color: '#222',
    marginTop: 16,
  },
  kakoButton: {
    backgroundColor: '#faf0e6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginBottom: 18,
  },
  kakoButtonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomNotice: {
    fontSize: 11,
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
    lineHeight: 16,
    marginBottom: 16,
  },
});

export default StoreMapScreen; 