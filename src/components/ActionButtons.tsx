import { useStore } from '../store/useStore';
import reload from '../assets/reload.png';

export const ActionButtons = () => {
    const { handleIncorrect, showRandomImage, reloadImage, resetPoints, isCorrectButtonDisabled, playerImages, currentImageIndex } = useStore();

    const currentImageAppearance = playerImages[currentImageIndex]?.appearance;

    return (
        <div className="flex justify-center items-center gap-4">
            <button
                className={`mt-4 p-2 bg-red-500 border-none rounded-md cursor-pointer transition-bg duration-300 text-white ${isCorrectButtonDisabled || currentImageAppearance ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                onClick={handleIncorrect}
                disabled={isCorrectButtonDisabled || currentImageAppearance}
            >Incorrecto
            </button>
            <button
                className={`mt-4 p-2 bg-green-500 border-none rounded-md cursor-pointer transition-bg duration-300 text-white ${isCorrectButtonDisabled || currentImageAppearance ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                onClick={showRandomImage}
                disabled={isCorrectButtonDisabled || currentImageAppearance}
            >Correcto
            </button>
            <button
                className="mt-4 p-2 bg-blue-500 border-none rounded-md cursor-pointer transition-bg duration-300 text-white hover:bg-blue-600"
                onClick={reloadImage}
            ><img src={reload} alt="Cambiador" />
            </button>
            <button
                className={`mt-4 p-2 bg-red-500 border-none rounded-md cursor-pointer transition-bg duration-300 text-white ${isCorrectButtonDisabled || currentImageAppearance ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                onClick={resetPoints}
            >Resetear Puntos
            </button>
        </div>
    );
};