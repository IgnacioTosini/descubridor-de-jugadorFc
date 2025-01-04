import { useEffect } from "react";
import { useStore } from '../store/useStore';

export const DiscoverPlayer = () => {
    const {
        playerImages,
        currentImageIndex,
        showPlayerOverlay,
        showCountryOverlay,
        showLeagueOverlay,
        showTeamOverlay,
        showModal,
        points,
        loadImages,
        togglePlayerOverlay,
        toggleCountryOverlay,
        toggleLeagueOverlay,
        toggleTeamOverlay,
        showRandomImage,
        handleCloseModal,
        handleIncorrect,
        playerOverlayDisabled,
        countryOverlayDisabled,
        leagueOverlayDisabled,
        teamOverlayDisabled,
    } = useStore();

    useEffect(() => {
        loadImages();
    }, [loadImages]);

    return (
        <div className="containerPlayer">
            <div className="imgWrapper">
                {playerImages.length > 0 && (
                    <img src={playerImages[currentImageIndex].src} className="imgPlayerGuess" />
                )}
                <div className={`overlayPrincipal ${showPlayerOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay ${showCountryOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay2 ${showLeagueOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay3 ${showTeamOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className="overlayContainer">
                    <div className="containerButton">
                        <button className="overlayButton" onClick={togglePlayerOverlay} disabled={playerOverlayDisabled}>Sacar imagen</button>
                        <span className="remaining">(-5)</span>
                    </div>
                    <div className="containerButton">
                        <button className="overlayButton" onClick={toggleCountryOverlay} disabled={countryOverlayDisabled}>Sacar Pais</button>
                        <span className="remaining">(-1)</span>
                    </div>
                    <div className="containerButton">
                        <button className="overlayButton" onClick={toggleLeagueOverlay} disabled={leagueOverlayDisabled}>Sacar Liga</button>
                        <span className="remaining">(-2)</span>
                    </div>
                    <div className="containerButton">
                        <button className="overlayButton" onClick={toggleTeamOverlay} disabled={teamOverlayDisabled}>Sacar Equipo</button>
                        <span className="remaining">(-2)</span>
                    </div>
                </div>
            </div>
            <div className="buttonContainer">
                <button className="incorrectButton" onClick={handleIncorrect}>Incorrecto</button>
                <button className="correctButton" onClick={showRandomImage}>Correcto</button>
            </div>
            <div className="points">Puntos: {points}</div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <p>Se han mostrado todas las imágenes.</p>
                    </div>
                </div>
            )}
        </div>
    );
};