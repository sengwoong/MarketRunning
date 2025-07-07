import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// 백엔드 서버 주소 설정
// localhost: iOS 시뮬레이터용
// 10.0.2.2: Android 에뮬레이터용
// 실제 기기에서는 컴퓨터의 실제 IP 주소 사용
const getApiBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8000';
    } else {
      return 'http://localhost:8000';
    }
  } else {
    return 'http://your-production-server.com';
  }
};

const API_BASE_URL = getApiBaseUrl();

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15초로 증가
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 요청 인터셉터 - 토큰 자동 첨부 및 로깅
apiClient.interceptors.request.use(
  async (config) => {
    try {
      console.log('🔍 API 요청:', config.method?.toUpperCase(), config.url);
      console.log('📍 Base URL:', API_BASE_URL);
      
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        // Bearer 접두사 없이 토큰만 전송
        config.headers.Authorization = token;
        console.log('🔐 토큰 첨부됨');
      }
      
      // 요청 데이터 로깅 (민감하지 않은 정보만)
      if (config.data && !config.url?.includes('login') && !config.url?.includes('register')) {
        console.log('📤 요청 데이터:', config.data);
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
    console.log('📡 API 응답 성공:', response.status, response.config.url);
    
    // 응답 데이터 로깅 (민감하지 않은 정보만)
    if (response.data && !response.config.url?.includes('login')) {
      console.log('📥 응답 데이터:', response.data);
    }
    
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    const url = error.response?.config?.url;
    
    console.error('💥 API 응답 에러:', status, url, error.message);
    
    // 상세 에러 정보 로깅
    if (error.response?.data) {
      console.error('📥 에러 응답 데이터:', error.response.data);
    }
    
    // 네트워크 연결 에러 처리
    if (error.code === 'ECONNABORTED') {
      console.error('⏰ 요청 시간 초과');
      error.message = '요청 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.';
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      console.error('🌐 네트워크 연결 에러');
      error.message = '네트워크 연결을 확인해주세요.';
    }
    
    // 토큰 만료 처리
    if (status === 401) {
      console.log('🔐 토큰 만료 또는 인증 실패');
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('user');
      
      // 로그인 페이지로 리다이렉트가 필요한 경우
      // NavigationService.navigate('Login');
    }
    
    return Promise.reject(error);
  }
);

// 연결 테스트 함수
export const testConnection = async (): Promise<boolean> => {
  try {
    console.log('🔍 서버 연결 테스트 시작...');
    const response = await apiClient.get('/health');
    console.log('✅ 서버 연결 성공:', response.data);
    return true;
  } catch (error) {
    console.error('❌ 서버 연결 실패:', error);
    return false;
  }
};

export default apiClient; 