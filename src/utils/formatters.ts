/**
 * 숫자 형식화 유틸리티 함수들
 */

/**
 * 숫자를 천 단위로 구분하여 문자열로 변환
 * React Native에서 toLocaleString이 지원되지 않는 경우를 대비
 */
export const formatNumber = (num: number | undefined | null): string => {
  if (num === undefined || num === null || isNaN(num)) {
    return '0';
  }
  
  // toLocaleString이 지원되는지 확인
  try {
    return num.toLocaleString('ko-KR');
  } catch (error) {
    // 지원되지 않는 경우 수동으로 형식화
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

/**
 * 포인트를 형식화하여 표시
 */
export const formatPoints = (points: number | undefined | null): string => {
  return `${formatNumber(points)}P`;
};

/**
 * 가격을 형식화하여 표시
 */
export const formatPrice = (price: number | undefined | null): string => {
  return `${formatNumber(price)}원`;
};

/**
 * 거리를 형식화하여 표시
 */
export const formatDistance = (distance: number | undefined | null): string => {
  if (distance === undefined || distance === null || isNaN(distance)) {
    return '0m';
  }
  
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)}km`;
  } else {
    return `${Math.round(distance)}m`;
  }
};

/**
 * 날짜를 형식화하여 표시
 */
export const formatDate = (date: string | Date | undefined | null): string => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return '';
  }
};

/**
 * 시간을 형식화하여 표시
 */
export const formatTime = (date: string | Date | undefined | null): string => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    return '';
  }
};

/**
 * 러닝 시간을 형식화하여 표시 (초를 시:분:초 형식으로)
 */
export const formatRunningTime = (seconds: number | undefined | null): string => {
  if (seconds === undefined || seconds === null || isNaN(seconds)) {
    return '00:00:00';
  }
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}; 