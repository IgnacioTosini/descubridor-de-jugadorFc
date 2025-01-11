import { useStore } from '../store/useStore';
import reload from '../assets/reload.png';

export const ActionButtons = () => {
    const { handleIncorrect, showRandomImage, reloadImage, isCorrectButtonDisabled } = useStore();

    return (
        <div className="flex justify-center items-center gap-4">
            <button
                className="mt-4 p-2 bg-red-500 border-none rounded-md cursor-pointer transition-bg duration-300 text-white"
                onClick={handleIncorrect}
            >Incorrecto
            </button>
            <button
                className={`mt-4 p-2 bg-green-500 border-none rounded-md cursor-pointer transition-bg duration-300 text-white ${isCorrectButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                onClick={showRandomImage}
                disabled={isCorrectButtonDisabled}
            >Correcto
            </button>
            <button
                className={`mt-4 p-2 bg-blue-500 border-none rounded-md cursor-pointer transition-bg duration-300 text-white ${isCorrectButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                onClick={reloadImage}
                disabled={isCorrectButtonDisabled}
            ><img src={reload} alt="Cambiador" />
            </button>
        </div>
    );
};