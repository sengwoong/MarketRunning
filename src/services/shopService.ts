import apiClient from './api';
import { 
  Shop, 
  NearbyShop, 
  NearbyShopsRequest, 
  Item, 
  SearchItemsRequest, 
  PurchaseRequest, 
  PurchaseResponse 
} from '../types/api';

class ShopService {
  // 모든 상점 조회
  async getShops(): Promise<Shop[]> {
    try {
      const response = await apiClient.get('/shops');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상점 조회 실패');
    }
  }

  // 특정 상점 조회
  async getShop(shopId: number): Promise<Shop> {
    try {
      const response = await apiClient.get(`/shops/${shopId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상점 조회 실패');
    }
  }

  // 주변 상점 검색
  async getNearbyShops(request: NearbyShopsRequest): Promise<NearbyShop[]> {
    try {
      const response = await apiClient.get('/nearby/nearby', {
        params: request
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '주변 상점 조회 실패');
    }
  }

  // 모든 상품 조회
  async getItems(): Promise<Item[]> {
    try {
      const response = await apiClient.get('/shops/items');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상품 조회 실패');
    }
  }

  // 특정 상품 조회
  async getItem(itemId: number): Promise<Item> {
    try {
      const response = await apiClient.get(`/shops/items/${itemId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상품 조회 실패');
    }
  }

  // 위치 기반 상품 검색
  async searchItems(request: SearchItemsRequest): Promise<Item[]> {
    try {
      const response = await apiClient.get('/shops/search/items', {
        params: request
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상품 검색 실패');
    }
  }

  // 상품 구매
  async purchaseItem(request: PurchaseRequest): Promise<PurchaseResponse> {
    try {
      const response = await apiClient.post('/shops/purchase', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상품 구매 실패');
    }
  }
}

export default new ShopService(); 