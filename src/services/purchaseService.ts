import apiClient from './api';
import { PurchaseRequest, PurchaseResponse } from '../types/api';

// 구매 내역 타입
interface PurchaseHistory {
  id: number;
  item_id: number;
  item_name: string;
  quantity: number;
  total_points: number;
  created_at: string;
  item: {
    id: number;
    name: string;
    description?: string;
    image_url?: string;
    point_price: number;
  };
}

class PurchaseService {
  // 상품 구매
  async purchaseItem(request: PurchaseRequest): Promise<PurchaseResponse> {
    try {
      const response = await apiClient.post('/purchases', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상품 구매 실패');
    }
  }

  // 구매 내역 조회
  async getPurchaseHistory(): Promise<PurchaseHistory[]> {
    try {
      const response = await apiClient.get('/purchases/history');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '구매 내역 조회 실패');
    }
  }

  // 특정 구매 내역 조회
  async getPurchase(purchaseId: number): Promise<PurchaseHistory> {
    try {
      const response = await apiClient.get(`/purchases/${purchaseId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '구매 내역 조회 실패');
    }
  }
}

export default new PurchaseService(); 