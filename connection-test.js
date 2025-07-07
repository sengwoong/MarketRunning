/**
 * 프론트엔드-백엔드 연결 테스트 스크립트
 * 
 * 사용법:
 * 1. 백엔드 서버 시작: cd MarketRunning-back && python main.py
 * 2. 이 스크립트 실행: node connection-test.js
 */

const axios = require('axios');

// 테스트 설정
const API_BASE_URL = 'http://localhost:8000';
const TEST_USER = {
  username: 'testuser',
  password: 'testpass123',
  email: 'test@example.com',
  gender: 'M',
  birth_year: 1990,
  region: '서울'
};

// 테스트 함수들
async function testServerConnection() {
  console.log('🔍 서버 연결 테스트 시작...');
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ 서버 연결 성공:', response.data);
    return true;
  } catch (error) {
    console.error('❌ 서버 연결 실패:', error.message);
    return false;
  }
}

async function testApiEndpoints() {
  console.log('\n📡 API 엔드포인트 테스트 시작...');
  
  const endpoints = [
    { method: 'GET', url: '/', name: '루트 엔드포인트' },
    { method: 'GET', url: '/health', name: '헬스 체크' },
    { method: 'GET', url: '/shops', name: '상점 목록' },
    { method: 'GET', url: '/shops/items', name: '상품 목록' },
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await axios({
        method: endpoint.method,
        url: `${API_BASE_URL}${endpoint.url}`,
        timeout: 5000
      });
      console.log(`✅ ${endpoint.name}: ${response.status}`);
    } catch (error) {
      console.error(`❌ ${endpoint.name}: ${error.response?.status || error.message}`);
    }
  }
}

async function testAuthFlow() {
  console.log('\n🔐 인증 플로우 테스트 시작...');
  
  try {
    // 1. 회원가입 테스트
    console.log('📝 회원가입 테스트...');
    try {
      const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, TEST_USER);
      console.log('✅ 회원가입 성공:', registerResponse.data);
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('⚠️ 이미 존재하는 사용자 (정상)');
      } else {
        console.error('❌ 회원가입 실패:', error.response?.data?.detail || error.message);
      }
    }

    // 2. 로그인 테스트
    console.log('🔑 로그인 테스트...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: TEST_USER.username,
      password: TEST_USER.password
    });
    
    console.log('✅ 로그인 성공');
    const token = loginResponse.data.access_token;
    
    // 3. 인증이 필요한 엔드포인트 테스트
    console.log('🔒 인증 필요 엔드포인트 테스트...');
    const authHeaders = { Authorization: `Bearer ${token}` };
    
    const authEndpoints = [
      { method: 'GET', url: '/users/me', name: '내 정보 조회' },
      { method: 'GET', url: '/cart', name: '장바구니 조회' },
      { method: 'GET', url: '/trophies', name: '트로피 조회' },
    ];

    for (const endpoint of authEndpoints) {
      try {
        const response = await axios({
          method: endpoint.method,
          url: `${API_BASE_URL}${endpoint.url}`,
          headers: authHeaders,
          timeout: 5000
        });
        console.log(`✅ ${endpoint.name}: ${response.status}`);
      } catch (error) {
        console.error(`❌ ${endpoint.name}: ${error.response?.status || error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ 인증 플로우 실패:', error.response?.data?.detail || error.message);
  }
}

async function testNearbyShops() {
  console.log('\n🗺️ 주변 상점 검색 테스트...');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/nearby`, {
      params: {
        lat: 37.5665,
        lng: 126.9780,
        radius: 1000
      }
    });
    console.log('✅ 주변 상점 검색 성공:', response.data.length, '개 상점');
  } catch (error) {
    console.error('❌ 주변 상점 검색 실패:', error.response?.data?.detail || error.message);
  }
}

async function testItemSearch() {
  console.log('\n🔍 상품 검색 테스트...');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/shops/search/items`, {
      params: {
        latitude: 37.5665,
        longitude: 126.9780,
        distance: 1000
      }
    });
    console.log('✅ 상품 검색 성공:', response.data.length, '개 상품');
  } catch (error) {
    console.error('❌ 상품 검색 실패:', error.response?.data?.detail || error.message);
  }
}

// 메인 테스트 실행
async function runAllTests() {
  console.log('🚀 MarketRunning 프론트엔드-백엔드 연결 테스트 시작\n');
  
  const serverConnected = await testServerConnection();
  
  if (serverConnected) {
    await testApiEndpoints();
    await testAuthFlow();
    await testNearbyShops();
    await testItemSearch();
  }
  
  console.log('\n🎉 테스트 완료!');
  console.log('\n📖 API 문서 확인: http://localhost:8000/docs');
  console.log('🔍 ReDoc 확인: http://localhost:8000/redoc');
}

// 스크립트 실행
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  testServerConnection,
  testApiEndpoints,
  testAuthFlow,
  testNearbyShops,
  testItemSearch,
  runAllTests
}; 