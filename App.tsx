import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import testNetworkConnection from './test_network';

const App = () => {
  useEffect(() => {
    // 앱 시작 시 네트워크 연결 테스트
    testNetworkConnection();
  }, []);

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#FF6B35" 
        translucent={false}
      />
      <AppNavigator />
    </>
  );
};

export default App;
