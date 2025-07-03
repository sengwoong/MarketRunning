import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import RecommendItem from '../components/RecommendItem';

const RunningCompleteScreen = ({ navigation, route }: any) => {
  const { time, points } = route.params || { time: 0, points: 0 };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${month}월 ${day}일`;
  };

  const goToTrophy = () => {
    navigation.navigate('Trophy');
  };

  const goToRunning = () => {
    navigation.navigate('Running');
  };

  const goToMarket = () => {
    navigation.navigate('Market');
  };

  return (
    <SafeAreaView style={styles.complete}>
      <ScrollView 
        style={styles.complete__content}
        contentContainerStyle={styles.complete__scrollContent}
      >
        {/* 캐릭터 영역 - 사용자가 직접 그릴 예정 */}
        <View style={styles.complete__character}>
          <Text style={styles.complete__characterPlaceholder}>
            보람을 채워봤습니다
          </Text>
        </View>

        {/* 보상 획득 메시지 */}
        <View style={styles.complete__rewardContainer}>
          <Text style={styles.complete__rewardText}>報酬を獲得しました</Text>
          <Text style={styles.complete__successText}>300成功</Text>
        </View>

        {/* 상단 컨텐츠 끝 */}
        <View style={styles.complete__topContent} />

        {/* 추천 상품 섹션 - 맨 아래 고정 */}
        <View style={styles.complete__bottomSection}>
          <RecommendItem
            title="株式会社新電機製作所 ナチュラルシャンプー"
            description="こういう商品をどうですか？"
            price="2,500円"
            onPress={() => {
              navigation.navigate('ProductDetail', { 
                product: { 
                  name: '株式会社新電機製作所 ナチュラルシャンプー', 
                  price: 2500 
                } 
              });
            }}
          />


        {/* 추천 상품 섹션 - 맨 아래 고정 */}

          <RecommendItem
            title="株式会社新電機製作所 ナチュラルシャンプー"
            description="こういう商品をどうですか？"
            price="2,500円"
            onPress={() => {
              navigation.navigate('ProductDetail', { 
                product: { 
                  name: '株式会社新電機製作所 ナチュラルシャンプー', 
                  price: 2500 
                } 
              });
            }}
          />

          <Text style={styles.complete__question}>
            おすすめがお気に召しませんでしたか？
            ご希望の商品があれば、ぜひ教えてください。
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Block: complete
  complete: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Element: complete__content
  complete__content: {
    flex: 1,
  },

  // Element: complete__scrollContent
  complete__scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },

  // Element: complete__character
  complete__character: {
    backgroundColor: '#FCFAF6',
    width: '100%',
    height: 393,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Element: complete__characterPlaceholder
  complete__characterPlaceholder: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },

  // Element: complete__rewardContainer
  complete__rewardContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  // Element: complete__rewardBox
  complete__rewardBox: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  // Element: complete__rewardText
  complete__rewardText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Element: complete__successText
  complete__successText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },

  // Element: complete__info
  complete__info: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  // Element: complete__infoDesc
  complete__infoDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    
  },

  // Element: complete__topContent
  complete__topContent: {
    flex: 1,

  },

  // Element: complete__bottomSection
  complete__bottomSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },

  // Element: complete__recommendSection
  complete__recommendSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },

  // Element: complete__question
  complete__question: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },

  // Element: complete__actions
  complete__actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 120,
  },

  // Element: complete__actionButton
  complete__actionButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
    gap: 8,
    paddingVertical: 20,
  },

  // Element: complete__actionIconText
  complete__actionIconText: {
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 10,
  },

  // Element: complete__actionLabel
  complete__actionLabel: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RunningCompleteScreen; 