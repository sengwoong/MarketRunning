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
} from 'react-native';
import { trophyService, UserTrophy } from '../services';

const { height: screenHeight } = Dimensions.get('window');

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
      Alert.alert('오류', error.message || '트로피 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const renderTrophyItem = ({ item }: { item: UserTrophy }) => (
    <View style={styles.trophy__item}>
      <View style={styles.trophy__circleContainer}>
        <View style={[
          styles.trophy__circle,
          item.completed ? styles.trophy__circleAchieved : styles.trophy__circleLocked
        ]}>
          {item.completed && (
            <View style={styles.trophy__checkmark}>
              <Text style={styles.trophy__checkmarkIcon}>✓</Text>
            </View>
          )}
          
          {/* 트로피 아이콘 */}
          <Text style={styles.trophy__characterText}>🏆</Text>
        </View>
        
        {/* 진행도 표시 */}
        <View style={styles.trophy__progressContainer}>
          <Text style={styles.trophy__progressText}>
            {item.progress} / {item.target}
          </Text>
          <View style={styles.trophy__progressBar}>
            <View 
              style={[
                styles.trophy__progressFill,
                { width: `${Math.min((item.progress / item.target) * 100, 100)}%` }
              ]}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.trophy__textSection}>
        <Text style={styles.trophy__title}>{item.title}</Text>
        <Text style={styles.trophy__description}>{item.description || ''}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.trophy}>
        <View style={styles.trophy__loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.trophy__loadingText}>트로피 정보를 불러오는 중...</Text>
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
  // Block: trophy
  trophy: {
    flex: 1,
    backgroundColor: '#ffffff',
  },



  // Element: trophy__list
  trophy__list: {
    flexGrow: 1,
  },

  // Element: trophy__item
  trophy__item: {
    backgroundColor: '#FCFAF6',
    height: screenHeight * 0.45,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },

  // Element: trophy__circleContainer
  trophy__circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Element: trophy__circle
  trophy__circle: {
    aspectRatio: 1,
    width: '70%',
    backgroundColor: '#87CEEB',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  // Modifier: trophy__circleAchieved
  trophy__circleAchieved: {
    backgroundColor: '#87CEEB',
  },

  // Modifier: trophy__circleLocked
  trophy__circleLocked: {
    backgroundColor: '#e0e0e0',
  },

  // Element: trophy__checkmark
  trophy__checkmark: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  // Element: trophy__checkmarkIcon
  trophy__checkmarkIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Element: trophy__characterText
  trophy__characterText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  // Element: trophy__textSection
  trophy__textSection: {
    alignItems: 'center',
  },

  // Element: trophy__title
  trophy__title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  // Element: trophy__separator
  trophy__separator: {
    height: 12,
  },

  // Element: trophy__progressContainer
  trophy__progressContainer: {
    width: '80%',
    marginTop: 10,
    alignItems: 'center',
  },

  // Element: trophy__progressText
  trophy__progressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontWeight: '500',
  },

  // Element: trophy__progressBar
  trophy__progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },

  // Element: trophy__progressFill
  trophy__progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 4,
  },

  // Element: trophy__description
  trophy__description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },

  // Element: trophy__loadingContainer
  trophy__loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Element: trophy__loadingText
  trophy__loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default TrophyScreen; 