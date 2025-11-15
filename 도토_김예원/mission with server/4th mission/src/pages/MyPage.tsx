import { useEffect, useState } from "react";
import { getMyInfo, updateMyInfo } from "../apis/auth";
import type { ResponseMyInfoDto } from "../types/auth";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import ConfirmModal from "../components/ConfirmModal";

const MyPage = () => {
  const { logout, withdraw, userName, setUserName } = useAuth(); // ✅ 전역 닉네임 사용
  const navigate = useNavigate();

  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    avatar: "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
      setForm({
        name: response?.data.name ?? "",
        bio: response?.data.bio ?? "",
        avatar: response?.data.avatar ?? "",
      });
      setUserName(response?.data.name ?? ""); // ✅ 초기 닉네임 세팅
    };
    getData();
  }, []);

  // ✅ 낙관적 업데이트 구현
  const mutation = useMutation({
    mutationFn: updateMyInfo,

    // 1️⃣ 서버 요청 전 UI를 즉시 변경
    onMutate: async (newForm) => {
      const prevName = form.name;
      const prevUserName = userName;

      // UI 즉시 반영
     setForm((prev) => ({ ...prev, name: newForm.name ?? prev.name }));
     setUserName(newForm.name ?? prevName);

      // 기존 상태를 rollback용으로 리턴
      return { prevName, prevUserName };
    },

    // 2️⃣ 요청 실패 시 롤백
    onError: (err, newForm, context) => {
      if (context?.prevName) setForm((prev) => ({ ...prev, name: context.prevName }));
      if (context?.prevUserName) setUserName(context.prevUserName);
      alert("닉네임 변경 실패");
    },

    // 3️⃣ 요청 성공 시 서버 데이터로 갱신
    onSuccess: (newData) => {
      setData(newData);
      alert("닉네임이 변경되었습니다!");
    },

    // 4️⃣ 완료 후 편집 종료
    onSettled: () => {
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    mutation.mutate(form);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleWithdrawConfirm = async () => {
    setIsModalOpen(false);
    await withdraw();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <div className="flex flex-col gap-3 w-[300px]">
        <div className="relative flex items-center justify-center py-2">
          <button
            onClick={() => navigate("/")}
            className="absolute left-1 flex items-center text-gray-500 hover:text-gray-900"
          >
            <IoIosArrowBack className="w-5 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-500">마이페이지</h1>
        </div>

        <div className="flex flex-col items-center gap-3 p-4 border rounded-md shadow-sm">
          <img
            src={form.avatar || "/default-profile.png"}
            alt="프로필 이미지"
            className="w-24 h-24 rounded-full object-cover border"
          />

          {isEditing ? (
            <>
              <input
                className="border px-2 py-1 rounded w-full"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="이름"
              />
              <input
                className="border px-2 py-1 rounded w-full"
                value={form.bio}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Bio"
              />
              <input
                className="border px-2 py-1 rounded w-full"
                value={form.avatar}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, avatar: e.target.value }))
                }
                placeholder="프로필 이미지 URL (선택)"
              />
              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                저장하기
              </button>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold text-gray-900">
                {form.name}
              </div>
              <div className="text-gray-700">{data?.data.bio || "Bio 없음"}</div>
              <div className="text-gray-500 text-sm">
                {data?.data.email ?? ""}
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
              >
                설정
              </button>
            </>
          )}
        </div>
      </div>

      {/* 로그아웃 */}
      <button
        className="w-[300px] bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
        onClick={handleLogout}
      >
        로그아웃
      </button>

      {/* 회원탈퇴 */}
      <button
        className="w-[300px] bg-red-500 text-white py-3 rounded-md font-medium hover:bg-red-600 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        회원탈퇴
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleWithdrawConfirm}
        title="회원 탈퇴"
        description="정말로 탈퇴하시겠습니까? 탈퇴 후 모든 정보가 삭제됩니다."
      />
    </div>
  );
};

export default MyPage;
