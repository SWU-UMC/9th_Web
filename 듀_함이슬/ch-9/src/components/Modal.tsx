import { useCartActions } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";

const Modal = () => {
    const { clearCart } = useCartActions();
    const { closeModal } = useModalActions();

    const handleCloseModal = () => {
        closeModal();
    };

    const handleInitializeCart = () => {
        clearCart();
        closeModal();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
            onClick={closeModal}
        >
            <div
                className="bg-white p-6 rounded-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="font-bold">정말 삭제하시겠습니까?</p>
                <div className="flex justify-center gap-5 mt-4">
                    <button
                        onClick={handleInitializeCart}
                        className="cursor-pointer bg-red-500 text-white p-3 rounded-md"
                    >
                        예
                    </button>
                    <button
                        onClick={handleCloseModal}
                        className="cursor-pointer bg-gray-300 p-3 rounded-md"
                    >
                        아니오
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
