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

// Utils
import { formatPoints } from '../utils/formatters';

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
import CategoryDetailScreen from '../screens/CategoryDetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// カスタム Drawer Content
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'ログアウト',
      '本当にログアウトしますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: 'ログアウト', 
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
      {/* ドロワーヘッダー */}
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.appTitle}>MarketRunning</Text>
        <Text style={styles.appSubtitle}>ウォーキングとショッピングの出会い</Text>
        
        {/* ユーザー情報 */}
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.username}>{user.username}様</Text>
            <Text style={styles.userPoints}>{formatPoints(user.points)}</Text>
          </View>
        )}
      </View>
      
      {/* 基本ドロワーアイテム */}
      <DrawerItemList {...props} />
      
      {/* ログアウトボタン */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 ログアウト</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

// 未認証ユーザー用ナビゲーター
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
          title: 'ログイン',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          title: '新規登録',
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

// 認証済みユーザー用メインナビゲーター
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
          title: 'ラン',
          headerTitle: 'ラン',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏃</Text>
          ),
        }}
      />
      
      <Drawer.Screen 
        name="Trophy" 
        component={TrophyScreen}
        options={{
          title: 'トロフィー',
          headerTitle: 'トロフィー',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏆</Text>
          ),
        }}
      />
      
      <Drawer.Screen 
        name="Market" 
        component={MarketScreen}
        options={{
          title: 'マーケット',
          headerTitle: 'ショップ',
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
          title: 'カート',
          headerTitle: 'カート',
          drawerIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🛍️</Text>
          ),
        }}
      />

      <Drawer.Screen 
        name="RunningComplete" 
        component={RunningCompleteScreen}
        options={{
          title: 'ラン完了',
          drawerItemStyle: { display: 'none' },
        }}
      />
      
      <Drawer.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen as unknown as React.ComponentType<any>}
        options={{
          title: '商品詳細',
          drawerItemStyle: { display: 'none' },
        }}
      />
      
      <Drawer.Screen 
        name="StoreMap" 
        component={StoreMapScreen}
        options={{
          title: '店舗マップ',
          drawerItemStyle: { display: 'none' },
        }}
      />

      <Drawer.Screen 
        name="CategoryDetail" 
        component={CategoryDetailScreen as unknown as React.ComponentType<any>}
        options={{
          title: 'カテゴリ',
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

// ローディング画面
const LoadingScreen = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FF6B35" />
      <Text style={styles.loadingText}>読み込み中...</Text>
    </View>
  );
};

// 内部 AppNavigator (認証状態チェック)
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

// メイン アプリ ナビゲーター (AuthProvider 含む)
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