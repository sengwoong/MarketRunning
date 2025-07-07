import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { trophyService } from '../services';
import { UserTrophy } from '../types/api';

const { width: screenWidth } = Dimensions.get('window');

const TrophyScreen = ({ navigation }: any) => {
  const [trophies, setTrophies] = useState<UserTrophy[]>([]);
  const [loading, setLoading] = useState(true);

  // 컴포넌트 마운트 시 트로피 데이터 로드
  useEffect(() => {
    loadTrophies();
  }, []);

  const loadTrophies = async () => {
    try {
      setLoading(true);
      const userTrophies = await trophyService.getUserTrophies();
      setTrophies(userTrophies);
    } catch (error: any) {
      Alert.alert('エラー', 'トロフィー情報の読み込みに失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const renderTrophyItem = ({ item }: { item: UserTrophy }) => (
    <View style={styles.trophyItem}>
      <Image 
        source={item.title === '3日連続ウォーキング' 
          ? require('../../img/3일연속걷기성공.png')
          : require('../../img/오늘걷기성공.png')
        }
        style={styles.trophyImage}
      />
      <Text style={styles.trophyTitle}>{item.title}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.trophy}>
        <View style={styles.trophy__loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.trophy__loadingText}>トロフィー情報を読み込み中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.trophy}>
      {/* 트로피 리스트 */}
      <FlatList
        data={trophies}
        renderItem={renderTrophyItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.trophy__list}
        ItemSeparatorComponent={() => <View style={styles.trophy__separator} />}
        refreshing={loading}
        onRefresh={loadTrophies}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  trophy: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  trophy__list: {
    padding: 16,
    alignItems: 'center',
  },
  trophy__loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophy__loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  trophy__separator: {
    height: 32,
  },
  trophyItem: {
    backgroundColor: '#FCFAF6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: screenWidth - 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trophyImage: {
    width: screenWidth - 80,
    height: screenWidth - 80,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  trophyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
} as const);

export default TrophyScreen; 