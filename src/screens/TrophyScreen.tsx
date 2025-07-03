import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const TrophyScreen = ({ navigation }: any) => {
  const [trophies, setTrophies] = useState([
    { id: 1, count: 300, title: '300성공', achieved: true },
    { id: 2, count: 20, title: '20성공', achieved: true },
    { id: 3, count: 100, title: '100성공', achieved: true },
    { id: 4, count: 50, title: '50성공', achieved: false },
    { id: 5, count: 500, title: '500성공', achieved: false },
    { id: 6, count: 1000, title: '1000성공', achieved: false },
  ]);

  const [loading, setLoading] = useState(false);

  // 무한스크롤 시뮬레이션
  const loadMoreTrophies = () => {
    if (loading) return;
    
    setLoading(true);
    setTimeout(() => {
      const newTrophies = [
        { id: Date.now() + 1, count: 750, title: '750성공', achieved: false },
        { id: Date.now() + 2, count: 1500, title: '1500성공', achieved: false },
      ];
      setTrophies(prev => [...prev, ...newTrophies]);
      setLoading(false);
    }, 1000);
  };

  const renderTrophyItem = ({ item }: any) => (
    <View style={styles.trophy__item}>
      <View style={styles.trophy__circleContainer}>
        <View style={[
          styles.trophy__circle,
          item.achieved ? styles.trophy__circleAchieved : styles.trophy__circleLocked
        ]}>
          {item.achieved && (
            <View style={styles.trophy__checkmark}>
              <Text style={styles.trophy__checkmarkIcon}>✓</Text>
            </View>
          )}
          
          {/* 캐릭터 텍스트 */}
          <Text style={styles.trophy__characterText}>캐릭터</Text>
        </View>
      </View>
      
      <View style={styles.trophy__textSection}>
        <Text style={styles.trophy__title}>{item.title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.trophy}>

      {/* 트로피 리스트 */}
      <FlatList
        data={trophies}
        renderItem={renderTrophyItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreTrophies}
        onEndReachedThreshold={0.1}
        contentContainerStyle={styles.trophy__list}
        ItemSeparatorComponent={() => <View style={styles.trophy__separator} />}
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
});

export default TrophyScreen; 