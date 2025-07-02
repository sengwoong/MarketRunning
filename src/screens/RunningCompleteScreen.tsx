import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const RunningCompleteScreen = ({ navigation, route }: any) => {
  const { time, points } = route.params || { time: 0, points: 0 };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const goToTrophy = () => {
    navigation.navigate('Trophy');
  };

  const goToRunning = () => {
    navigation.navigate('Running');
  };

  const goToAchievement = () => {
    navigation.navigate('Trophy'); // 목표달성율 페이지로 이동 (Trophy 페이지 활용)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 완료 메시지 */}
        <Text style={styles.completeText}>달리기 완료!</Text>

        {/* 캐릭터 */}
        <View style={styles.characterContainer}>
          <View style={styles.character}>
            <View style={styles.characterHead}>
              <View style={styles.characterFace}>
                <View style={styles.eye} />
                <View style={styles.eye} />
                <View style={styles.happyMouth} />
              </View>
            </View>
            <View style={styles.characterBody} />
            <View style={styles.limbs}>
              <View style={styles.armRaised} />
              <View style={styles.armRaised} />
              <View style={styles.leg} />
              <View style={styles.leg} />
            </View>
          </View>
        </View>

        {/* 달성 정보 - 클릭 가능 */}
        <TouchableOpacity style={styles.achievementContainer} onPress={goToAchievement}>
          <Text style={styles.timeText}>운동 시간: {formatTime(time)}</Text>
          <Text style={styles.pointsText}>{points}점수</Text>
          <Text style={styles.achievementText}>목표달성율 보기 👆</Text>
        </TouchableOpacity>

        {/* 버튼들 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.trophyButton} onPress={goToTrophy}>
            <Text style={styles.buttonText}>트로피 보기</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.againButton} onPress={goToRunning}>
            <Text style={styles.buttonText}>다시 달리기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  completeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  characterContainer: {
    marginBottom: 40,
  },
  character: {
    alignItems: 'center',
  },
  characterHead: {
    width: 80,
    height: 80,
    backgroundColor: '#FFE4B5',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  characterFace: {
    alignItems: 'center',
  },
  eye: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  happyMouth: {
    width: 20,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 10,
    marginTop: 5,
  },
  characterBody: {
    width: 50,
    height: 60,
    backgroundColor: '#4169E1',
    borderRadius: 25,
    marginBottom: 15,
  },
  limbs: {
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  armRaised: {
    width: 18,
    height: 35,
    backgroundColor: '#FFE4B5',
    borderRadius: 9,
    marginHorizontal: 10,
    position: 'absolute',
    top: -50,
    transform: [{ rotate: '-45deg' }],
  },
  leg: {
    width: 18,
    height: 40,
    backgroundColor: '#4169E1',
    borderRadius: 9,
    marginHorizontal: 8,
  },
  achievementContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  timeText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  pointsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  trophyButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  againButton: {
    backgroundColor: '#32CD32',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RunningCompleteScreen; 