import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";

const resetModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state)=> state.modal.isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg min-w-[260px] text-center">
                <h2 className="mb-4 font-semibold text-gray-800">
                    정말 삭제하시겠습니까?
                </h2>

                <div className="flex justify-center gap-6">
                    <button
                        className="px-4 py-2 rounded-md bg-gray-200 text-gray-800"
                        onClick={() => dispatch(closeModal())}
                    >
                        아니요
                    </button>

                    <button
                        className="px-7 py-2 rounded-md bg-red-500 text-white"
                        onClick={() => {
                            dispatch(clearCart());
                            dispatch(closeModal());
                        }}
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default resetModal;