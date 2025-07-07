# MarketRunning 프로젝트 실행 가이드

이 가이드는 MarketRunning 프론트엔드(React Native)와 백엔드(FastAPI)를 연결하여 실행하는 방법을 설명합니다.

## 🚀 빠른 시작

### 1. 백엔드 실행 (MarketRunning-back)

```bash
cd MarketRunning-back

# 환경 변수 설정
cp .env.example .env  # .env 파일이 없다면 아래 환경변수를 직접 생성

# Docker로 데이터베이스 및 서비스 실행
docker-compose up -d

# 또는 로컬에서 직접 실행
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 프론트엔드 실행 (MarketRunning)

```bash
cd MarketRunning

# 의존성 설치
npm install

# React Native Metro 서버 시작
npm start

# 새 터미널에서 Android/iOS 실행
npm run android  # Android
npm run ios      # iOS
```

## 📱 프론트엔드 새로운 기능

### ✅ 완전 연결된 기능들

1. **사용자 인증**
   - 회원가입: `RegisterScreen`
   - 로그인: `LoginScreen`
   - 토큰 자동 관리 (AsyncStorage)

2. **상품 관리**
   - 실시간 상품 목록 조회
   - 카테고리별 필터링
   - 상품 구매 (포인트 시스템)

3. **트로피 시스템**
   - 사용자 트로피 진행도 표시
   - 실시간 업적 추적

4. **API 서비스**
   - 자동 토큰 첨부
   - 에러 처리
   - 로딩 상태 관리

### 🔧 백엔드 API 엔드포인트

- **인증**: `/auth/login`, `/auth/register`
- **사용자**: `/users/me`
- **상품**: `/shops/items`, `/shops/purchase`
- **트로피**: `/trophies`, `/trophies/user`
- **위치**: `/nearby/nearby`
- **장바구니**: `/cart`

## 💾 환경 변수 설정

### 백엔드 (.env)
```env
POSTGRES_DB=marketrunning
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

QDRANT_HOST=localhost
QDRANT_PORT=6333ㄴ

SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

### 프론트엔드 (src/services/api.ts)
- 기본 서버 주소: `http://localhost:8000`
- Android 에뮬레이터: `http://10.0.2.2:8000`
- 실제 기기: `http://[컴퓨터IP]:8000`

## 🔗 주요 변경사항

### 프론트엔드
1. **새로운 파일들**:
   - `src/services/` - API 클라이언트 및 서비스
   - `src/types/api.ts` - 타입 정의

2. **업데이트된 화면들**:
   - `LoginScreen`: 실제 로그인 API 연동
   - `RegisterScreen`: 회원가입 API 연동
   - `MarketScreen`: 실시간 상품 데이터 로드
   - `TrophyScreen`: 사용자 트로피 진행도 표시

3. **새로운 종속성**:
   - `axios`: HTTP 클라이언트
   - `@react-native-async-storage/async-storage`: 토큰 저장

### 백엔드
- CORS 설정 완료
- 모든 API 엔드포인트 활성화
- PostGIS 위치 기반 검색
- JWT 인증 시스템

## 🛠️ 개발 팁

1. **API 서버 주소 변경**:
   `src/services/api.ts`에서 `API_BASE_URL` 수정

2. **디버깅**:
   - 브라우저: http://localhost:8000/docs (Swagger UI)
   - React Native: Flipper 또는 React Native Debugger

3. **데이터베이스**:
   - PostgreSQL + PostGIS
   - pgAdmin 또는 DBeaver로 접근 가능

## 🚨 문제 해결

### 네트워크 연결 오류
- Android 에뮬레이터: `10.0.2.2:8000` 사용
- iOS 시뮬레이터: `localhost:8000` 사용
- 실제 기기: 컴퓨터의 실제 IP 주소 사용

### 토큰 관련 오류
- AsyncStorage 클리어: 앱 재설치 또는 디바이스 설정에서 앱 데이터 삭제

### CORS 오류
- 백엔드 `main.py`에서 `allow_origins` 설정 확인

이제 MarketRunning 앱이 완전히 연결되어 실행됩니다! 🎉 