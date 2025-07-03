import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

// Context
import { AuthProvider, useAuth } from '../context/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RunningScreen from '../screens/RunningScreen';
import RunningCompleteScreen from '../screens/RunningCompleteScreen';
import TrophyScreen from '../screens/TrophyScreen';
import MarketScreen from '../screens/MarketScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import StoreMapScreen from '../screens/StoreMapScreen';
import CartScreen from '../screens/CartScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// 커스텀 Drawer Content
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '로그아웃', 
          style: 'destructive',
          onPress: async () => {
            await logout();
          }
        }
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* 드로어 헤더 */}
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.appTitle}>MarketRunning</Text>
        <Text style={styles.appSubtitle}>걷기와 쇼핑의 만남</Text>
        
        {/* 사용자 정보 */}
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user.username}님</Text>
            <Text style={styles.userPoints}>{user.point.toLocaleString()}P</Text>
          </View>
        )}
      </View>
      
      {/* 기본 드로어 아이템들 */}
      <DrawerItemList {...props} />
      
      {/* 로그아웃 버튼 */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 로그아웃</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

// 인증되지 않은 사용자용 네비게이터
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF6B35',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{
          title: '로그인',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          title: '회원가입',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

// 인증된 사용자용 메인 네비게이터
const MainNavigator = () => {
  return (
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

      <Drawer.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          title: '장바구니',
          headerTitle: '장바구니',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🛍️</Text>
          ),
        }}
      />

      {/* 추가 화면들을 Drawer에 직접 포함 */}
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
  );
};

// 로딩 스크린
const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FF6B35" />
      <Text style={styles.loadingText}>로딩중...</Text>
    </View>
  );
};

// 내부 AppNavigator (인증 상태 체크)
const AppNavigatorInner = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

// 메인 앱 네비게이터 (AuthProvider 포함)
const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigatorInner />
      </AuthProvider>
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
  userInfo: {
    marginTop: 15,
    alignItems: 'center',
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userPoints: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  logoutContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  logoutText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default AppNavigator; 