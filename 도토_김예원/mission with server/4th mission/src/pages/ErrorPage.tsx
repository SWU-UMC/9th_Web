// 에러 페이지
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-2xl font-bold text-red-500">에러가 발생했습니다</h1>

      <p className="text-gray-600 mt-4">
        잠시 후 다시 시도해주세요.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-10 px-5 py-2 rounded-lg border-1 border-blue-600
          text-blue-600 bg-white
          hover:bg-blue-600 hover:text-white
          transition-colors"
      >
        새로고침
      </button>
    </div>
  );
};

export default ErrorPage;