import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// 백엔드 서버 주소 설정
// localhost: iOS 시뮬레이터용
// 10.0.2.2: Android 에뮬레이터용
// 실제 기기에서는 컴퓨터의 실제 IP 주소 사용
const API_BASE_URL = __DEV__ 
  ? Platform.OS === 'android' 
    ? 'http://10.0.2.2:8000'
    : 'http://localhost:8000'
  : 'http://your-production-server.com';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 자동 첨부 및 로깅
apiClient.interceptors.request.use(
  async (config) => {
    try {
      console.log('🔍 API 요청:', config.method?.toUpperCase(), config.url);
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('토큰 조회 실패:', error);
    }
    return config;
  },
  (error) => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 만료 처리 및 로깅
apiClient.interceptors.response.use(
  (response) => {
    console.log('📡 API 응답:', response.status, response.config.url);
    return response;
  },
  async (error) => {
    console.error('💥 API 응답 에러:', error.response?.status, error.response?.config?.url, error.message);
    
    if (error.response?.status === 401) {
      // 토큰 만료 시 스토리지에서 제거
      await AsyncStorage.removeItem('access_token');
      console.log('🔐 토큰 만료로 인한 로그아웃');
      // 로그인 화면으로 리다이렉트 (필요 시)
    }
    return Promise.reject(error);
  }
);

export default apiClient; 