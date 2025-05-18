export const validateUserInfo = (name: string): boolean => {
  if (!name.trim()) {
    alert('이름을 입력해주세요');
    return false;
  }
  return true;
};
