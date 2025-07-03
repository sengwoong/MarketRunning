import apiClient from './api';
import { CartSummary, AddToCartRequest, UpdateCartItemRequest, CartItem } from '../types/api';

const cartService = {
  // 장바구니 조회
  async getCart(): Promise<CartSummary> {
    const response = await apiClient.get<CartSummary>('/cart/');
    return response.data;
  },

  // 장바구니에 상품 추가
  async addToCart(request: AddToCartRequest): Promise<CartItem> {
    const response = await apiClient.post<CartItem>('/cart/', request);
    return response.data;
  },

  // 장바구니 상품 수량 업데이트
  async updateCartItem(cartItemId: number, request: UpdateCartItemRequest): Promise<CartItem> {
    const response = await apiClient.put<CartItem>(`/cart/${cartItemId}`, request);
    return response.data;
  },

  // 장바구니에서 상품 제거
  async removeCartItem(cartItemId: number): Promise<void> {
    await apiClient.delete(`/cart/${cartItemId}`);
  },

  // 장바구니 비우기
  async clearCart(): Promise<void> {
    await apiClient.delete('/cart/');
  }
};

export default cartService; 