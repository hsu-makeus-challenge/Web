export const validateForm = (content: string) => {
  if (!content.trim()) {
    alert('댓글을 입력해주세요!');
    return false;
  }
  return true;
};
