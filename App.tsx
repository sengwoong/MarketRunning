import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RunningScreen from './src/screens/RunningScreen';
import RunningCompleteScreen from './src/screens/RunningCompleteScreen';
import TrophyScreen from './src/screens/TrophyScreen';
import MarketScreen from './src/screens/MarketScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import StoreMapScreen from './src/screens/StoreMapScreen';

type ScreenName = 
  | 'Login' 
  | 'Register' 
  | 'MainTabs' 
  | 'RunningComplete' 
  | 'ProductDetail' 
  | 'StoreMap';

type TabName = 'Running' | 'Trophy' | 'Market';

interface NavigationState {
  currentScreen: ScreenName;
  currentTab: TabName;
  productId?: string;
}

const App = () => {
  const [navigation, setNavigation] = useState<NavigationState>({
    currentScreen: 'Login',
    currentTab: 'Running',
  });

  const navigate = (screen: ScreenName, params?: any) => {
    setNavigation(prev => ({
      ...prev,
      currentScreen: screen,
      ...params,
    }));
  };

  const setTab = (tab: TabName) => {
    setNavigation(prev => ({
      ...prev,
      currentTab: tab,
    }));
  };

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabItem, navigation.currentTab === 'Running' && styles.activeTab]}
        onPress={() => setTab('Running')}
      >
        <Text style={styles.tabIcon}>🏃</Text>
        <Text style={[styles.tabLabel, navigation.currentTab === 'Running' && styles.activeTabLabel]}>
          달리기
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabItem, navigation.currentTab === 'Trophy' && styles.activeTab]}
        onPress={() => setTab('Trophy')}
      >
        <Text style={styles.tabIcon}>🏆</Text>
        <Text style={[styles.tabLabel, navigation.currentTab === 'Trophy' && styles.activeTabLabel]}>
          트로피
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabItem, navigation.currentTab === 'Market' && styles.activeTab]}
        onPress={() => setTab('Market')}
      >
        <Text style={styles.tabIcon}>🛒</Text>
        <Text style={[styles.tabLabel, navigation.currentTab === 'Market' && styles.activeTabLabel]}>
          마켓
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderMainTabs = () => {
    switch (navigation.currentTab) {
      case 'Running':
        return <RunningScreen navigation={{ navigate }} />;
      case 'Trophy':
        return <TrophyScreen navigation={{ navigate }} />;
      case 'Market':
        return <MarketScreen navigation={{ navigate }} />;
      default:
        return <RunningScreen navigation={{ navigate }} />;
    }
  };

  const renderScreen = () => {
    switch (navigation.currentScreen) {
      case 'Login':
        return <LoginScreen navigation={{ navigate }} />;
      case 'Register':
        return <RegisterScreen navigation={{ navigate }} />;
      case 'MainTabs':
        return (
          <View style={styles.container}>
            <View style={styles.content}>
              {renderMainTabs()}
            </View>
            {renderTabBar()}
          </View>
        );
      case 'RunningComplete':
        return <RunningCompleteScreen navigation={{ navigate }} />;
      case 'ProductDetail':
        return <ProductDetailScreen navigation={{ navigate }} productId={navigation.productId} />;
      case 'StoreMap':
        return <StoreMapScreen navigation={{ navigate }} />;
      default:
        return <LoginScreen navigation={{ navigate }} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
    height: 60,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    // Active tab styling can be added here
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
  },
  activeTabLabel: {
    color: '#FF6B35',
  },
});

export default App;
