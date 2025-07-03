/**
 * React Native 앱에서 네트워크 연결 테스트
 */
import { Platform } from 'react-native';

const API_BASE_URL = __DEV__ 
  ? Platform.OS === 'android' 
    ? 'http://10.0.2.2:8000'
    : 'http://localhost:8000'
  : 'http://your-production-server.com';

const testNetworkConnection = async () => {
  console.log('🔗 네트워크 연결 테스트 시작...');
  console.log(`📍 API URL: ${API_BASE_URL}`);
  
  try {
    // 기본 연결 테스트
    const response = await fetch(`${API_BASE_URL}/docs`);
    console.log('✅ 기본 연결 성공:', response.status);
    
    // 로그인 테스트
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'user',
        password: 'user'
      })
    });
    
    if (loginResponse.ok) {
      const data = await loginResponse.json();
      console.log('✅ 로그인 테스트 성공:', data);
    } else {
      const errorText = await loginResponse.text();
      console.log('❌ 로그인 테스트 실패:', loginResponse.status, errorText);
    }
    
  } catch (error) {
    console.error('❌ 네트워크 연결 실패:', error);
  }
};

export default testNetworkConnection; 