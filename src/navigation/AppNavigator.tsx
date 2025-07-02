import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RunningScreen from '../screens/RunningScreen';
import RunningCompleteScreen from '../screens/RunningCompleteScreen';
import TrophyScreen from '../screens/TrophyScreen';
import MarketScreen from '../screens/MarketScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import StoreMapScreen from '../screens/StoreMapScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 메인 탭 네비게이터
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#eee',
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Running" 
        component={RunningScreen}
        options={{
          title: '달리기',
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ fontSize: 20, color }}>🏃</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Trophy" 
        component={TrophyScreen}
        options={{
          title: '트로피',
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ fontSize: 20, color }}>🏆</Text>
          ),
        }}
      />
      <Tab.Screen 
        name="Market" 
        component={MarketScreen}
        options={{
          title: '마켓',
          tabBarIcon: ({ color }: { color: string }) => (
            <Text style={{ fontSize: 20, color }}>🛒</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// 메인 앱 네비게이터
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* 인증 관련 화면들 */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        
        {/* 메인 탭 화면들 */}
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        
        {/* 개별 화면들 */}
        <Stack.Screen name="RunningComplete" component={RunningCompleteScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="StoreMap" component={StoreMapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 