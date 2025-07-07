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

  // 주변 상점 검색 - 백엔드 API에 맞게 수정
  async getNearbyShops(request: NearbyShopsRequest): Promise<NearbyShop[]> {
    try {
      const response = await apiClient.get('/nearby', {
        params: {
          lat: request.lat,
          lng: request.lng,
          radius: request.radius
        }
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

  // 위치 기반 상품 검색 - 백엔드 API에 맞게 수정
  async searchItems(request: SearchItemsRequest): Promise<Item[]> {
    try {
      const response = await apiClient.get('/shops/search/items', {
        params: {
          latitude: request.latitude,
          longitude: request.longitude,
          distance: request.distance,
          category: request.category,
          min_price: request.min_price,
          max_price: request.max_price,
          name: request.name
        }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상품 검색 실패');
    }
  }

  // 카테고리 기반 상품 검색 - 새로 추가
  async searchByCategory(params: {
    main_category?: string;
    sub_category?: string;
    user_region?: string;
    limit?: number;
  }): Promise<Item[]> {
    try {
      const response = await apiClient.get('/shops/search/category', {
        params
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '카테고리 검색 실패');
    }
  }

  // 상품 구매 - 구매 라우터로 이동
  async purchaseItem(request: PurchaseRequest): Promise<PurchaseResponse> {
    try {
      const response = await apiClient.post('/purchases', request);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '상품 구매 실패');
    }
  }

  // 벡터 기반 상품 검색 - 새로 추가
  async searchItemsVector(query: string, params?: {
    main_category?: string;
    sub_category?: string;
    min_price?: number;
    max_price?: number;
    region?: string;
    limit?: number;
  }): Promise<Item[]> {
    try {
      const response = await apiClient.post('/search/items', {
        query,
        ...params
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '벡터 검색 실패');
    }
  }

  // 추천 상품 조회 - 새로 추가
  async getRecommendations(): Promise<Item[]> {
    try {
      const response = await apiClient.get('/search/recommendations');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '추천 상품 조회 실패');
    }
  }

  // 최근 구매한 카테고리 가져오기 (임시로 기본 상품 목록 반환)
  async getRecentPurchaseCategory(): Promise<string> {
    try {
      // 임시로 '전체상품' 반환 (향후 백엔드 API 구현 후 변경)
      return '전체상품';
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '최근 구매한 카테고리 조회 실패');
    }
  }

  // カテゴリ別の商品取得
  async getItemsByCategory(mainCategory: string, page = 1, limit = 20): Promise<Item[]> {
    try {
      // "全商品" の場合は全商品取得
      if (!mainCategory || mainCategory === '全商品') {
        return this.getItems();
      }

      const response = await apiClient.get('/shops/search/category', {
        params: {
          main_category: mainCategory,
          limit,
          page,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('カテゴリ別商品取得エラー:', error?.response?.data || error.message);
      throw new Error(error.response?.data?.detail || 'カテゴリ別商品取得に失敗しました');
    }
  }

  // 많이 구매한 상품 가져오기 (임시로 전체 상품 반환)
  async getPopularItems(): Promise<Item[]> {
    try {
      // 임시로 전체 상품 목록 반환 (향후 백엔드 API 구현 후 변경)
      const response = await apiClient.get('/shops/items');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || '인기 상품 조회 실패');
    }
  }

  // 오늘의 추천 상품 조회 - 새로 추가
  async getTodayRecommendation(): Promise<Item | null> {
    try {
      const response = await apiClient.get('/qdrant/recommendations/today');
      return response.data;
    } catch (error: any) {
      console.error(error);
      return null;
    }
  }
}

export default new ShopService(); 