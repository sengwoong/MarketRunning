import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const RunningScreen = ({ navigation }: any) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [distance, setDistance] = useState(0);
  const [steps, setSteps] = useState(0);
  const [inputSteps, setInputSteps] = useState('');

  useEffect(() => {
    let interval: any;
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
    return `${month}月 ${day}日`;
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

        {/* キャラクター領域 */}
        <View style={styles.running__character} >
        <Image 
          source={require('../../img/오늘걷기중.png')}
          style={styles.image}
        />
        </View>

        {/* 日付 */}
        <View style={styles.running__date}>
          <Text style={styles.running__dateText}>
            {getCurrentDate().split(' ')[0]}
          </Text>
          <Text style={styles.running__dateText}>
            {getCurrentDate().split(' ')[1]}
          </Text>
        </View>

        {/* 距離情報ボックス */}
        <View style={styles.running__info}>
          <Text style={styles.running__infoTitle}>
            {distance.toFixed(1)}km 歩きました
          </Text>

          <Text style={styles.running__infoDesc}>
            あと2歩で歩行結果を受け取れます！
          </Text>

          {/* 歩数 */}
          <Text style={{ marginTop: 8, color: '#333', fontWeight: 'bold' }}>
            現在の歩数: {steps}
          </Text>

          {/* 統計 */}
          <View style={styles.running__stats}>
            <View style={styles.running__statItem}>
              <View style={styles.running__statContent}>
                <Text style={styles.running__statNumber}>30日</Text>
                <Text style={styles.running__statLabel}>連続達成</Text>
              </View>
            </View>
            <View style={styles.running__statItem}>
              <View style={styles.running__statContent}>
                <Text style={styles.running__statNumber}>80%</Text>
                <Text style={styles.running__statLabel}>目標達成率</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 下部アイコン */}
        <View style={styles.running__actions}>
          <View style={styles.achievementItem}>
            <View style={styles.iconCircle}>
              <Image 
                source={require('../../img/3일연속걷기성공.png')}
                style={styles.iconImage}
              />
            </View>
            <Text style={styles.achievementText}>七日中三日</Text>
          </View>

          <TouchableOpacity 
            style={styles.achievementItem}
            onPress={() => navigation.navigate('RunningComplete', { 
              time, 
              points: Math.floor(time / 6) * 10,
              steps 
            })}
          >
            <View style={styles.iconCircle}>
              <Image 
                source={require('../../img/오늘걷기중.png')}
                style={styles.iconImage}
              />
            </View>
            <Text style={styles.achievementText}>目標達成率</Text>
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
    height: 332,
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
    width: '100%',
    paddingHorizontal: 20,
    height: 150,
    marginTop: 20,
  },

  achievementItem: {
    alignItems: 'center',
    width: 120,
    height: 120,
  },

  iconCircle: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },

  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  achievementText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'contain',

  },
});

export default RunningScreen; 