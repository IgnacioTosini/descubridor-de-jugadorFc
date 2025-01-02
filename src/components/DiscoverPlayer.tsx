import { useState } from "react";
import { fcImages } from "../data/fcImagesPlayers";

export const DiscoverPlayer = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showPlayerOverlay, setShowPlayerOverlay] = useState(true);
    const [showCountryOverlay, setShowCountryOverlay] = useState(true);
    const [showLeagueOverlay, setShowLeagueOverlay] = useState(true);
    const [showTeamOverlay, setShowTeamOverlay] = useState(true);

    const togglePlayerOverlay = () => setShowPlayerOverlay(!showPlayerOverlay);
    const toggleCountryOverlay = () => setShowCountryOverlay(!showCountryOverlay);
    const toggleLeagueOverlay = () => setShowLeagueOverlay(!showLeagueOverlay);
    const toggleTeamOverlay = () => setShowTeamOverlay(!showTeamOverlay);

    const showRandomImage = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * fcImages.length);
        } while (randomIndex === currentImageIndex);

        setShowCountryOverlay(true);
        setShowLeagueOverlay(true);
        setShowPlayerOverlay(true);
        setShowTeamOverlay(true);

        setTimeout(() => {
            setCurrentImageIndex(randomIndex);
        }, 1000);
    };

    return (
        <div className="containerPokemon">
            <div className="imgWrapper">
                <img src={fcImages[currentImageIndex].src} className="imgPokemonGuess" />
                <div className={`overlayPrincipal ${showPlayerOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay ${showCountryOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay2 ${showLeagueOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay3 ${showTeamOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className="overlayContainer">
                    <button className="overlayButton" onClick={togglePlayerOverlay}>Sacar imagen</button>
                    <button className="overlayButton" onClick={toggleCountryOverlay}>Sacar Pais</button>
                    <button className="overlayButton" onClick={toggleLeagueOverlay}>Sacar Liga</button>
                    <button className="overlayButton" onClick={toggleTeamOverlay}>Sacar Equipo</button>
                </div>
            </div>
            <button className="randomButton" onClick={showRandomImage}>Mostrar Aleatorio</button>
        </div>
    );
}
