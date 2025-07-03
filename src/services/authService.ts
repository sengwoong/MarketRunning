import apiClient from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../types/api';

class AuthService {
  // 로그인
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      console.log('🚀 API 로그인 요청:', credentials.username);
      const response = await apiClient.post('/auth/login', credentials);
      console.log('📡 API 응답:', response.status, response.data);
      
      const { access_token, token_type, user } = response.data;
      
      // 토큰 저장
      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('💾 토큰 저장 완료');
      
      return { access_token, token_type, user };
    } catch (error: any) {
      console.error('💥 API 로그인 에러:', error.response?.status, error.response?.data, error.message);
      throw new Error(error.response?.data?.detail || '로그인 실패');
    }
  }

  // 회원가입
  async register(userData: RegisterRequest): Promise<User> {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '회원가입 실패');
    }
  }

  // 로그아웃
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('로그아웃 중 오류:', error);
    }
  }

  // 토큰 확인
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('access_token');
    } catch (error) {
      console.error('토큰 조회 실패:', error);
      return null;
    }
  }

  // 사용자 정보 가져오기
  async getUser(): Promise<User | null> {
    try {
      const userString = await AsyncStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      return null;
    }
  }

  // 로그인 상태 확인
  async isLoggedIn(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  // 내 정보 조회 (서버에서 최신 정보 가져오기)
  async getMe(): Promise<User> {
    try {
      const response = await apiClient.get('/users/me');
      const user = response.data;
      
      // 로컬 스토리지 업데이트
      await AsyncStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '사용자 정보 조회 실패');
    }
  }
}

export default new AuthService(); 