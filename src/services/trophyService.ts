import apiClient from './api';
import { Trophy, UserTrophy } from '../types/api';

// 러닝 데이터 타입 추가
interface RunningData {
  distance: number;
  duration: number;
  calories: number;
  steps: number;
  route?: {
    latitude: number;
    longitude: number;
    timestamp: number;
  }[];
}

class TrophyService {
  // 모든 트로피 조회 (사용자 트로피 목록)
  async getTrophies(): Promise<UserTrophy[]> {
    try {
      const response = await apiClient.get('/trophies');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '트로피 조회 실패');
    }
  }

  // 특정 트로피 조회
  async getTrophy(trophyId: number): Promise<UserTrophy> {
    try {
      const response = await apiClient.get(`/trophies/${trophyId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '트로피 조회 실패');
    }
  }

  // 사용자 트로피 조회 (프론트엔드용)
  async getUserTrophies(): Promise<UserTrophy[]> {
    try {
      const response = await apiClient.get('/trophies/user');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '사용자 트로피 조회 실패');
    }
  }

  // 러닝 완료 후 트로피 업적 확인 - 새로 추가
  async checkAchievements(runningData: RunningData): Promise<{
    achievements: UserTrophy[];
    points_earned: number;
    message: string;
  }> {
    try {
      const response = await apiClient.post('/trophies/check-achievements', runningData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '업적 확인 실패');
    }
  }

  // 트로피 진행도 업데이트 (백엔드에 해당 엔드포인트가 없으므로 주석 처리)
  // async updateProgress(trophyId: number, progress: number): Promise<UserTrophy> {
  //   try {
  //     const response = await apiClient.put(`/trophies/${trophyId}/progress`, {
  //       progress
  //     });
  //     return response.data;
  //   } catch (error: any) {
  //     throw new Error(error.response?.data?.detail || '트로피 진행도 업데이트 실패');
  //   }
  // }
}

export default new TrophyService(); 