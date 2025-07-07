# MarketRunning 프론트엔드-백엔드 연결 가이드

## 🔗 연결 구조 개요

MarketRunning은 다음과 같은 구조로 연결됩니다:

```
React Native App (Frontend)
         ↓
    HTTP/HTTPS API
         ↓
   FastAPI Server (Backend)
         ↓
   PostgreSQL + Qdrant
```

## 📋 사전 준비사항

### 백엔드 서버 실행
```bash
cd MarketRunning-back
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

### 프론트엔드 앱 실행
```bash
cd MarketRunning
npm install
npm start
```

## 🔧 연결 설정

### 1. API 기본 URL 설정
프론트엔드에서 백엔드 서버 주소를 올바르게 설정해야 합니다:

- **iOS 시뮬레이터**: `http://localhost:8000`
- **Android 에뮬레이터**: `http://10.0.2.2:8000`
- **실제 기기**: 컴퓨터의 실제 IP 주소 사용

### 2. 네트워크 설정
백엔드 서버는 `0.0.0.0:8000`에서 실행되어 모든 네트워크 인터페이스에서 접근 가능합니다.

### 3. CORS 설정
백엔드에서 다음 origin들을 허용합니다:
- `http://localhost:3000` (React 개발 서버)
- `http://localhost:8081` (React Native Metro)
- `http://10.0.2.2:8081` (Android 에뮬레이터)
- `http://localhost:19006` (Expo 개발 서버)

## 🧪 연결 테스트

### 자동 테스트 실행
```bash
# 프로젝트 루트에서
node connection-test.js
```

### 수동 테스트
1. 백엔드 서버 상태 확인: `http://localhost:8000/health`
2. API 문서 확인: `http://localhost:8000/docs`
3. 앱에서 로그인 테스트

## 🔍 주요 API 엔드포인트

### 인증
- `POST /auth/register` - 회원가입
- `POST /auth/login` - 로그인

### 상점/상품
- `GET /shops` - 상점 목록
- `GET /shops/items` - 상품 목록
- `GET /nearby` - 주변 상점 검색
- `GET /shops/search/items` - 위치 기반 상품 검색

### 장바구니
- `GET /cart` - 장바구니 조회
- `POST /cart` - 장바구니에 상품 추가
- `PUT /cart/{id}` - 장바구니 상품 수량 변경
- `DELETE /cart/{id}` - 장바구니 상품 제거

### 구매
- `POST /purchases` - 상품 구매
- `GET /purchases/history` - 구매 내역

### 트로피
- `GET /trophies` - 사용자 트로피 목록
- `POST /trophies/check-achievements` - 업적 확인

### 벡터 검색
- `POST /search/items` - 벡터 기반 상품 검색
- `GET /search/recommendations` - 추천 상품

## 🔐 인증 플로우

1. **회원가입/로그인**: 사용자 정보로 JWT 토큰 발급
2. **토큰 저장**: AsyncStorage에 토큰 저장
3. **API 호출**: 모든 요청에 `Authorization: Bearer {token}` 헤더 첨부
4. **토큰 갱신**: 토큰 만료 시 자동 로그아웃

## 🚨 문제 해결

### 연결 실패 시 확인사항
1. 백엔드 서버가 실행 중인지 확인
2. 방화벽 설정 확인
3. 네트워크 연결 확인
4. API URL이 올바른지 확인

### 인증 오류 시
1. 토큰이 유효한지 확인
2. 로그인 정보가 올바른지 확인
3. 토큰 저장소 초기화 후 재로그인

### 데이터 로딩 실패 시
1. 백엔드 데이터베이스 연결 확인
2. Qdrant 서버 상태 확인
3. API 응답 로그 확인

## 📱 플랫폼별 설정

### iOS
```typescript
// iOS 시뮬레이터에서는 localhost 사용
const API_URL = 'http://localhost:8000';
```

### Android
```typescript
// Android 에뮬레이터에서는 10.0.2.2 사용
const API_URL = 'http://10.0.2.2:8000';
```

### 실제 기기
```typescript
// 컴퓨터의 실제 IP 주소 사용
const API_URL = 'http://192.168.1.100:8000';
```

## 🔄 데이터 흐름

### 상품 검색 흐름
1. 사용자가 검색어 입력
2. 프론트엔드에서 `/search/items` API 호출
3. 백엔드에서 Qdrant 벡터 검색 수행
4. 결과를 프론트엔드에 반환
5. 화면에 검색 결과 표시

### 러닝 완료 흐름
1. 러닝 데이터 수집
2. `/trophies/check-achievements` API 호출
3. 백엔드에서 업적 확인 및 포인트 적립
4. 결과를 프론트엔드에 반환
5. 업적 달성 알림 표시

## 📊 모니터링

### 로그 확인
- 프론트엔드: React Native 디버거 콘솔
- 백엔드: FastAPI 서버 로그

### 성능 모니터링
- API 응답 시간
- 네트워크 요청 실패율
- 토큰 만료 빈도

이 가이드를 따라 설정하면 프론트엔드와 백엔드가 정상적으로 연결됩니다. 