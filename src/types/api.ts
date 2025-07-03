// API 응답 공통 타입
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// 인증 관련 타입
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  password: string;
  gender?: string;
  birth_year?: number;
}

// 사용자 타입
export interface User {
  id: number;
  username: string;
  gender?: string;
  birth_year?: number;
  point: number;
  created_at: string;
  updated_at?: string;
}

// 상점 타입
export interface Shop {
  id: number;
  name: string;
  description?: string;
  category?: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at?: string;
}

export interface NearbyShop {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
}

// 상품 타입
export interface Item {
  id: number;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  point_price: number;
  image_url?: string;
  shop_id?: number;
  shop_name?: string;
  distance?: number;
  latitude?: number;
  longitude?: number;
  created_at: string;
  updated_at?: string;
}

// 트로피 타입
export interface Trophy {
  id: number;
  title: string;
  description?: string;
  target: number;
  trophy_type: string;
  icon_url?: string;
  created_at: string;
}

export interface UserTrophy {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  progress: number;
  target: number;
  icon_url?: string;
  completed_at?: string;
}

// 구매 타입
export interface PurchaseRequest {
  item_id: number;
  quantity: number;
}

export interface PurchaseResponse {
  id: number;
  user_id: number;
  item_id: number;
  quantity: number;
  total_points: number;
  created_at: string;
  user_point_after: number;
  item: Item;
}

// 주변 상점 검색 타입
export interface NearbyShopsRequest {
  lat: number;
  lng: number;
  radius: number;
}

// 상품 검색 타입
export interface SearchItemsRequest {
  latitude: number;
  longitude: number;
  distance: number;
  category?: string;
  min_price?: number;
  max_price?: number;
  name?: string;
}

// 장바구니 타입
export interface CartItem {
  id: number;
  user_id: number;
  item_id: number;
  quantity: number;
  created_at: string;
  updated_at?: string;
  item: Item;
}

export interface CartSummary {
  total_items: number;
  total_points: number;
  items: CartItem[];
}

export interface AddToCartRequest {
  item_id: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// 에러 타입
export interface ApiError {
  detail: string;
  status_code: number;
} 