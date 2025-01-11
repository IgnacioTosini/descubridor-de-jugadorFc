import { useEffect } from "react";
import { useStore } from '../store/useStore';
import { PlayerImage } from './PlayerImage';
import { OverlayButton } from './OverlayButton';
import { ActionButtons } from './ActionButtons';
import { Modal } from './Modal';
import { Spinner } from "./Spinner/Spinner";

export const DiscoverPlayer = () => {
    const { playerImages, currentImageIndex, currentPage, showPlayerOverlay, showCountryOverlay, showLeagueOverlay, showTeamOverlay, showModal, points, loadImages } = useStore();

    useEffect(() => {
        loadImages(currentPage);
    }, [loadImages, currentPage]);

    return (
        <div className=" flex justify-center items-center flex-col gap-4 shadow-lg w-4/5 max-w-[600px] p-8 rounded-lg">
            <div className="relative w-full">
                {playerImages.length > 0 ? (
                    <PlayerImage
                        playerImages={playerImages}
                        currentImageIndex={currentImageIndex}
                        showPlayerOverlay={showPlayerOverlay}
                        showCountryOverlay={showCountryOverlay}
                        showLeagueOverlay={showLeagueOverlay}
                        showTeamOverlay={showTeamOverlay}
                    />
                ) :
                (
                    <Spinner />
                )}
                <div className="flex justify-around items-center w-full bg-blue-200">
                    <OverlayButton type="player" text="Sacar imagen" cost="-5" />
                    <OverlayButton type="country" text="Sacar Pais" cost="-1" />
                    <OverlayButton type="league" text="Sacar Liga" cost="-2" />
                    <OverlayButton type="team" text="Sacar Equipo" cost="-2" />
                </div>
            </div>
            <ActionButtons />
            <div className="text-lg">Puntos: {points}</div>
            <Modal showModal={showModal} />
        </div>
    );
};