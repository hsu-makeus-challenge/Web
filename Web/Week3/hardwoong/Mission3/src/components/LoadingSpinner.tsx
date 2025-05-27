const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 rounded-full border-gray-300 border-t-green-300 animate-spin"></div>
      {/* w-12, h-12: 너비와 높이가 같은 정사각형 생성 */}
      {/* border-4: 테두리 두께 설정 */}
      {/* rounded-full: 정사각형을 원으로 테두리가 둥글게 변경 */}
      {/* border-gray-300 border-t-green-300: 테두리를 전체적으로 밝은 회색, 위쪽 테두리는 밝은 초록색으로 설정 */}
      {/* animate-spin: Tailwind의 기본 애니메이션 유틸리티, 무한히 돌아가는 회전 애니메이션 */}
    </div>
  );
};

export default LoadingSpinner;