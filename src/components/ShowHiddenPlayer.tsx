import { useState } from "react";
import { PlayerImage } from "./PlayerImage";
import { useStore } from "../store/useStore";

export const ShowHiddenPlayer = () => {
    const [showHidenPlayer, setShowHidenPlayer] = useState(false);
    const { playerImages, currentImageIndex } = useStore();

    const showImage = () => {
        setShowHidenPlayer(!showHidenPlayer);
    };

    return (
        <div className="flex justify-center items-center flex-col gap-4 shadow-lg w-4/5 max-w-[600px] p-8 rounded-lg">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showImage}>
                Mostrar jugador Oculto
            </button>
            {playerImages.length > 0 && showHidenPlayer === true ? (
                <div className="w-full max-h-[400px] overflow-y-auto">
                    <PlayerImage
                        playerImages={playerImages}
                        currentImageIndex={currentImageIndex}
                        showPlayerOverlay={false}
                        showNameOverlay={false}
                        showCountryOverlay={false}
                        showLeagueOverlay={false}
                        showTeamOverlay={false}
                    />
                </div>
            ) : null}
        </div>
    );
};