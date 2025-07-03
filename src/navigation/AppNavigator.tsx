import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RunningScreen from '../screens/RunningScreen';
import RunningCompleteScreen from '../screens/RunningCompleteScreen';
import TrophyScreen from '../screens/TrophyScreen';
import MarketScreen from '../screens/MarketScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import StoreMapScreen from '../screens/StoreMapScreen';

const Drawer = createDrawerNavigator();

// 커스텀 Drawer Content
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* 드로어 헤더 */}
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.appTitle}>MarketRunning</Text>
        <Text style={styles.appSubtitle}>걷기와 쇼핑의 만남</Text>
      </View>
      
      {/* 기본 드로어 아이템들 */}
      <DrawerItemList {...props} />
      

    </DrawerContentScrollView>
  );
};

// 메인 앱 네비게이터
const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Running"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#FF6B35',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 18,
            },
            drawerActiveTintColor: '#FF6B35',
            drawerInactiveTintColor: '#666',
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: '500',
              marginLeft: -10,
            },
            drawerItemStyle: {
              marginVertical: 2,
            },
            drawerStyle: {
              backgroundColor: '#fff',
              width: 280,
            },
            swipeEnabled: true,
            swipeEdgeWidth: 50,
          }}
        >
          <Drawer.Screen 
            name="Running" 
            component={RunningScreen}
            options={{
              title: '달리기',
              headerTitle: '달리기',
              drawerIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🏃</Text>
              ),
            }}
          />
          
          <Drawer.Screen 
            name="Trophy" 
            component={TrophyScreen}
            options={{
              title: '트로피',
              headerTitle: '트로피',
              drawerIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🏆</Text>
              ),
            }}
          />
          
          <Drawer.Screen 
            name="Market" 
            component={MarketScreen}
            options={{
              title: '마켓',
              headerTitle: 'shop',
              headerShown: true,
              drawerIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🛒</Text>
              ),
            }}
          />

          {/* 추가 화면들을 Drawer에 직접 포함 */}
          <Drawer.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              title: '로그인',
              drawerItemStyle: { display: 'none' }, // 드로어에서 숨김
            }}
          />
          
          <Drawer.Screen 
            name="Register" 
            component={RegisterScreen}
            options={{
              title: '회원가입',
              drawerItemStyle: { display: 'none' }, // 드로어에서 숨김
            }}
          />
          
          <Drawer.Screen 
            name="RunningComplete" 
            component={RunningCompleteScreen}
            options={{
              title: '달리기 완료',
              drawerItemStyle: { display: 'none' }, // 드로어에서 숨김
            }}
          />
          
          <Drawer.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={{
              title: '상품 상세',
              drawerItemStyle: { display: 'none' }, // 드로어에서 숨김
            }}
          />
          
          <Drawer.Screen 
            name="StoreMap" 
            component={StoreMapScreen}
            options={{
              title: '매장 지도',
              drawerItemStyle: { display: 'none' }, // 드로어에서 숨김
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#FF6B35',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: -4,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  appTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  appSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AppNavigator; 