import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "확인",
  description = "정말 진행하시겠습니까?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-md shadow-lg w-[320px] p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 mb-5">{description}</p>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="w-[45%] bg-gray-200 py-2 rounded-md text-gray-700 hover:bg-gray-300"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="w-[45%] bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;