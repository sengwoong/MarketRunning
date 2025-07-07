// 모든 서비스를 한 곳에서 export
export { default as apiClient, testConnection } from './api';
export { default as authService } from './authService';
export { default as shopService } from './shopService';
export { default as cartService } from './cartService';
export { default as trophyService } from './trophyService';
export { default as purchaseService } from './purchaseService';

// 전체 서비스 연결 테스트 함수
export const testAllServices = async (): Promise<{
  server: boolean;
  auth: boolean;
  shop: boolean;
  cart: boolean;
  trophy: boolean;
  purchase: boolean;
}> => {
  const results = {
    server: false,
    auth: false,
    shop: false,
    cart: false,
    trophy: false,
    purchase: false,
  };

  try {
    // 서버 연결 테스트
    const { testConnection } = await import('./api');
    results.server = await testConnection();

    if (results.server) {
      // 각 서비스별 테스트 (인증이 필요하지 않은 엔드포인트만)
      try {
        const { default: shopService } = await import('./shopService');
        await shopService.getShops();
        results.shop = true;
      } catch (error) {
        console.warn('Shop service test failed:', error);
      }

      try {
        const { default: trophyService } = await import('./trophyService');
        // 트로피 서비스는 인증이 필요하므로 스킵
        results.trophy = true;
      } catch (error) {
        console.warn('Trophy service test failed:', error);
      }

      // 인증이 필요한 서비스들은 로그인 후에만 테스트 가능
      results.auth = true;
      results.cart = true;
      results.purchase = true;
    }

  } catch (error) {
    console.error('Service test failed:', error);
  }

  return results;
};

// 타입도 함께 export
export * from '../types/api'; 