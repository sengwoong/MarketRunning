import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

const RunningScreen = ({ navigation }: any) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
        setDistance(prevDistance => prevDistance + 0.001);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const getCurrentDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${month}월 ${day}일`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleComplete = () => {
    setIsRunning(false);
    navigation.navigate('RunningComplete', { 
      time, 
      points: Math.floor(time / 6) * 10 
    });
  };

  return (
    <SafeAreaView style={styles.running}>
      <View style={styles.running__content}>
        {/* 캐릭터 영역 */}
        <View style={styles.running__character} />

        {/* 날짜 */}
        <View style={styles.running__date}>
          <Text style={styles.running__dateText}>
            {getCurrentDate().split(' ')[0]}
          </Text>
          <Text style={styles.running__dateText}>
            {getCurrentDate().split(' ')[1]}
          </Text>
        </View>

        {/* 거리 정보 박스 */}
        <View style={styles.running__info}>
          <Text style={styles.running__infoTitle}>
            {distance.toFixed(1)}km 걸었습니다.
          </Text>

          <Text style={styles.running__infoDesc}>
            앞으로 2걸음 더 걸으면 걷기 결과를 받을 수 있습니다!
          </Text>

          {/* 통계 */}
          <View style={styles.running__stats}>
            <View style={styles.running__statItem}>
              <View style={styles.running__statContent}>
                <Text style={styles.running__statNumber}>30일</Text>
                <Text style={styles.running__statLabel}>연속달성</Text>
              </View>
            </View>
            <View style={styles.running__statItem}>
              <View style={styles.running__statContent}>
                <Text style={styles.running__statNumber}>80%</Text>
                <Text style={styles.running__statLabel}>목표달성률</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 하단 버튼들 */}
        <View style={styles.running__actions}>
          <TouchableOpacity 
            style={styles.running__actionButton} 
            onPress={handleStartStop}
          >
      
              <Text style={styles.running__actionIconText}>📅</Text>
        
            <Text style={styles.running__actionLabel}>
              {isRunning ? '정지' : '시작'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.running__actionButton} 
            onPress={handleComplete}
          >
              <Text style={styles.running__actionIconText}>📊</Text>
              <Text style={styles.running__actionLabel}>목표달성률</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Block: running
  running: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Element: running__content
  running__content: {
    flex: 1,
    alignItems: 'center',
  },

  // Element: running__character
  running__character: {
    backgroundColor: '#FCFAF6',
    width: '100%',
    height: 393,
    marginTop: 40,
    marginBottom: 24,
  },

  // Element: running__date
  running__date: {
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
  },

  // Element: running__dateText
  running__dateText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 24,
    textAlign: 'center',
    backgroundColor: '#FCFAF6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  // Element: running__info
  running__info: {
    width: '100%',
    height: 150,
    backgroundColor: '#FCFAF6',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  // Element: running__infoTitle
  running__infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  // Element: running__infoDesc
  running__infoDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
    marginBottom: 12,
    lineHeight: 20,
  },

  // Element: running__stats
  running__stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },

  // Element: running__statItem
  running__statItem: {
    alignItems: 'center',
  },

  // Element: running__statContent
  running__statContent: {
    flexDirection: 'row',
    gap: 4,
  },

  // Element: running__statNumber
  running__statNumber: {
    fontSize: 14,
    color: '#333',
  },

  // Element: running__statLabel
  running__statLabel: {
    fontSize: 14,
    color: '#666',
  },

  // Element: running__actions
  running__actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    width: '100%',
  },

  // Element: running__actionButton
  running__actionButton: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
    gap: 8,
    paddingVertical: 20,
  },

  // Element: running__actionIconText
  running__actionIconText: {
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 10,
  },

  // Element: running__actionLabel
  running__actionLabel: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RunningScreen; 