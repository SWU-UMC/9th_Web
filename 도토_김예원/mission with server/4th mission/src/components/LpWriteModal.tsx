import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios"; // ✅ axiosInstance 사용 
import { useNavigate } from "react-router-dom";

interface LpWriteModalProps {
  onClose: () => void;
}

interface CreateLpRequest {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
}

export default function LpWriteModal({ onClose }: LpWriteModalProps) {
  const navigate = useNavigate();
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");
  const [lpTag, setLpTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [lpImage, setLpImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  // ✅ LP 생성 API 호출
  const createLpMutation = useMutation({
  mutationFn: async (newLp: CreateLpRequest) => {
    const response = await axiosInstance.post("/v1/lps", newLp);
    return response.data;
  },
  onSuccess: async () => {
  console.log("✅ LP 등록 성공 - invalidate + refetch 실행");
  await queryClient.invalidateQueries({ queryKey: ["lps", "latest"] });
  await queryClient.refetchQueries({ queryKey: ["lps", "latest"] });
  onClose();
  navigate("/");
},
  onError: (error) => {
    console.error("LP 생성 실패:", error);
    alert("LP 생성에 실패했습니다.");
  },
});
  // ✅ 이미지 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLpImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleImageClick = () => fileInputRef.current?.click();

  // ✅ 태그 추가 / 삭제
  const handleAddTag = () => {
    const trimmed = lpTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setLpTag("");
    }
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  // ✅ 제출
  const handleSubmit = () => {
    if (!lpName.trim() || !lpContent.trim()) {
      alert("LP 제목과 내용을 입력해주세요.");
      return;
    }

    const newLp: CreateLpRequest = {
  title: lpName,
  content: lpContent,
  thumbnail:
    lpImage && lpImage.startsWith("data:")
      ? "https://cdn.pixabay.com/photo/2017/02/16/12/20/vinyl-record-2074668_1280.jpg"
      : lpImage || "https://cdn.pixabay.com/photo/2016/11/29/09/08/vinyl-1869215_1280.jpg",
  tags,
  published: true,
};

    createLpMutation.mutate(newLp);
  };

  return (
    <>
      {/* 배경 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="relative bg-white text-white rounded-2xl p-8 w-[380px] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-white text-3xl"
          >
            ×
          </button>

          {/* LP 이미지 */}
          <div className="flex justify-center mb-6 cursor-pointer" onClick={handleImageClick}>
            <img
              src={lpImage || "/images/lp-icon.png"}
              alt="LP"
              className="w-26 h-26 object-cover rounded-md"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* 입력 폼 */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="LP Name"
              value={lpName}
              onChange={(e) => setLpName(e.target.value)}
              className="bg-gray-300 rounded-md px-3 py-2 text-sm text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              placeholder="LP Content"
              value={lpContent}
              onChange={(e) => setLpContent(e.target.value)}
              className="bg-gray-300 rounded-md px-3 py-2 text-sm text-white placeholder-white resize-none h-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            {/* 태그 입력 */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="LP Tag"
                value={lpTag}
                onChange={(e) => setLpTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                className="bg-gray-300 rounded-md px-3 py-2 text-sm text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-600 flex-1"
              />
              <button
                onClick={handleAddTag}
                className="bg-blue-600 hover:bg-blue-800 text-white px-3 rounded-md text-sm"
              >
                Add
              </button>
            </div>

            {/* 태그 리스트 */}
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-3 py-1 rounded-md text-sm text-white bg-blue-600"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="font-bold text-lg text-white leading-none hover:text-black"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={createLpMutation.isPending}
              className="mt-3 bg-blue-600 hover:bg-blue-800 text-white py-2 rounded-md font-semibold transition-all disabled:opacity-50"
            >
              {createLpMutation.isPending ? "등록 중..." : "Add LP"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}