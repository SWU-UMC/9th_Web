interface WithdrawModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

export const WithdrawModal = ({ onConfirm, onCancel }: WithdrawModalProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            onClick={onCancel}>
            <div className="bg-white p-6 rounded-sm w-96"
                onClick={(e) => e.stopPropagation()}>
                <p className="text-center mt-5">정말로 탈퇴하시겠습니까?</p>
                <div className="flex justify-center gap-3 mt-5">
                    <button className="p-2 bg-gray-400 rounded-sm cursor-pointer"
                        onClick={onConfirm}>예</button>
                    <button className="p-2 bg-gray-400 rounded-sm cursor-pointer"
                        onClick={onCancel}>아니오</button>
                </div>
            </div>
        </div>
    );
};