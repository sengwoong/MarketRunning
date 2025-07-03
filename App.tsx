import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import GoogleFit, { Scopes } from 'react-native-google-fit';


const App = () => {


const options = {
  scopes: [Scopes.FITNESS_ACTIVITY_READ],
};

GoogleFit.authorize(options)
  .then(() => {
    console.log('Google Fit 인증 성공');

    // 걸음 수 가져오기
    GoogleFit.getDailyStepCountSamples(new Date())
      .then((results) => {
        console.log('걸음 수 데이터:', results);
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error('Google Fit 인증 실패:', error));



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
