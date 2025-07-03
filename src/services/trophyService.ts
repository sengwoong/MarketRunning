import apiClient from './api';
import { Trophy, UserTrophy } from '../types/api';

class TrophyService {
  // 모든 트로피 조회
  async getTrophies(): Promise<Trophy[]> {
    try {
      const response = await apiClient.get('/trophies');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '트로피 조회 실패');
    }
  }

  // 특정 트로피 조회
  async getTrophy(trophyId: number): Promise<Trophy> {
    try {
      const response = await apiClient.get(`/trophies/${trophyId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '트로피 조회 실패');
    }
  }

  // 사용자 트로피 조회
  async getUserTrophies(): Promise<UserTrophy[]> {
    try {
      const response = await apiClient.get('/trophies/user');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '사용자 트로피 조회 실패');
    }
  }

  // 트로피 진행도 업데이트
  async updateProgress(trophyId: number, progress: number): Promise<UserTrophy> {
    try {
      const response = await apiClient.put(`/trophies/${trophyId}/progress`, {
        progress
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '트로피 진행도 업데이트 실패');
    }
  }
}

export default new TrophyService(); 