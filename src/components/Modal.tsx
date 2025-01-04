import { useStore } from '../store/useStore';

type ModalProps = {
    showModal: boolean
}

export const Modal = ({ showModal }: ModalProps) => {
    const { handleCloseModal } = useStore();

    return (
        showModal && (
            <div
                className="fixed flex justify-center items-center z-[1000] left-0 top-0 w-full h-full bg-black bg-opacity-50">
                <div
                    className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-[500px] text-center animate-fadeIn">
                    <span
                        className="text-gray-500 float-right text-2xl font-bold cursor-pointer"
                        onClick={handleCloseModal}
                    >&times;
                    </span>
                    <p className="text-lg">Se han mostrado todas las imágenes.</p>
                </div>
            </div>
        )
    );
};