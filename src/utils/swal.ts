import Swal from 'sweetalert2';

//튜토리얼 사용법
// import { showSuccess, showError, showConfirm, showLoading, showTimer, showHtml, showCustom } from '../utils/swal';

// // 성공 알림
// showSuccess('성공', '작업이 완료되었습니다!');

// // 에러 알림
// showError('오류', '작업 중 오류가 발생했습니다.');

// // 확인/취소 알림
// showConfirm('확인', '정말 삭제하시겠습니까?').then((result) => {
//   if (result.isConfirmed) {
//     // 확인 버튼 클릭 시 실행할 코드
//   }
// });

// // 로딩 알림
// showLoading('데이터 로딩 중...');

// // 타이머 알림
// showTimer('완료', '3초 후 자동으로 닫힙니다');

// // HTML 내용 알림
// showHtml('안내', '<b>중요</b>한 내용입니다.');

// // 커스텀 알림
// showCustom({
//   title: '커스텀',
//   text: '원하는 대로 설정할 수 있습니다',
//   icon: 'info'
// });

// 기본 성공 알림
export const showSuccess = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: '확인'
  });
};

// 기본 에러 알림
export const showError = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: '확인'
  });
};

// 확인/취소 알림
export const showConfirm = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소'
  });
};

// 로딩 알림
export const showLoading = (title: string = '로딩 중...') => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

// 타이머 알림
export const showTimer = (title: string, text: string, timer: number = 3000) => {
  return Swal.fire({
    title,
    text,
    timer,
    showConfirmButton: false
  });
};

// HTML 내용이 있는 알림
export const showHtml = (title: string, html: string) => {
  return Swal.fire({
    title,
    html,
    icon: 'info',
    confirmButtonText: '확인'
  });
};

// 커스텀 스타일 알림
export const showCustom = (options: any) => {
  return Swal.fire({
    ...options,
    customClass: {
      popup: 'my-custom-popup',
      title: 'my-custom-title',
      confirmButton: 'my-custom-button',
      ...options.customClass
    }
  });
}; 