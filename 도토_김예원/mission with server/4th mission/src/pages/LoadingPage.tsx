// 로딩 페이지
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full" />
    </div>
  );
};

export default LoadingPage;