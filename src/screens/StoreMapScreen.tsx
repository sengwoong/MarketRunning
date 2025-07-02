import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
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

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← 뒤로</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>매장 위치</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 지도 영역 */}
      <View style={styles.mapContainer}>
        <View style={styles.map}>
          {/* 지도 배경 */}
          <View style={styles.mapBackground}>
            <Text style={styles.mapLabel}>서울시</Text>
          </View>

          {/* 매장 마커들 */}
          {stores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={[
                styles.storeMarker,
                { left: `${store.x}%`, top: `${store.y}%` }
              ]}
              onPress={() => handleStorePress(store)}
            >
              <Text style={styles.markerEmoji}>{store.emoji}</Text>
              <Text style={styles.markerText}>{store.name}</Text>
            </TouchableOpacity>
          ))}

          {/* 현재 위치 */}
          <View style={styles.currentLocation}>
            <Text style={styles.currentLocationText}>📍</Text>
            <Text style={styles.currentLocationLabel}>현재 위치</Text>
          </View>
        </View>
      </View>

      {/* 매장 목록 */}
      <ScrollView style={styles.storeList}>
        <Text style={styles.storeListTitle}>근처 매장</Text>
        {stores.map((store) => (
          <TouchableOpacity 
            key={store.id} 
            style={styles.storeItem}
            onPress={() => handleStorePress(store)}
          >
            <View style={styles.storeIcon}>
              <Text style={styles.storeEmoji}>{store.emoji}</Text>
            </View>
            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.storeAddress}>{store.address}</Text>
              <Text style={styles.storeDistance}>약 2.3km</Text>
            </View>
            <TouchableOpacity style={styles.directionButton}>
              <Text style={styles.directionButtonText}>길찾기</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 60,
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#f0f8ff',
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    position: 'relative',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#e6f3ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#87CEEB',
    opacity: 0.5,
  },
  storeMarker: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  markerEmoji: {
    fontSize: 24,
    marginBottom: 2,
  },
  markerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'white',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    textAlign: 'center',
    minWidth: 30,
  },
  currentLocation: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    alignItems: 'center',
  },
  currentLocationText: {
    fontSize: 20,
    marginBottom: 2,
  },
  currentLocationLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FF6B35',
    backgroundColor: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  storeList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  storeListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  storeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  storeIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  storeEmoji: {
    fontSize: 20,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  storeDistance: {
    fontSize: 12,
    color: '#999',
  },
  directionButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  directionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default StoreMapScreen; 