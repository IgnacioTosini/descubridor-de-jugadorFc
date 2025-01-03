import { useState, useEffect } from "react";
import { importAllImages } from '../data/fcImagesPlayers';
import { Image } from "../types";

export const DiscoverPlayer = () => {
    const [pokemonImages, setPokemonImages] = useState<Image[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showPlayerOverlay, setShowPlayerOverlay] = useState(true);
    const [showCountryOverlay, setShowCountryOverlay] = useState(true);
    const [showLeagueOverlay, setShowLeagueOverlay] = useState(true);
    const [showTeamOverlay, setShowTeamOverlay] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [points, setPoints] = useState(0);
    const [playerOverlayUsed, setPlayerOverlayUsed] = useState(false);
    const [countryOverlayUsed, setCountryOverlayUsed] = useState(false);
    const [leagueOverlayUsed, setLeagueOverlayUsed] = useState(false);
    const [teamOverlayUsed, setTeamOverlayUsed] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            const images = await importAllImages();
            setPokemonImages(images);
        };
        loadImages();
    }, []);

    const togglePlayerOverlay = () => {
        setShowPlayerOverlay(!showPlayerOverlay);
        setPlayerOverlayUsed(!playerOverlayUsed);
    };

    const toggleCountryOverlay = () => {
        setShowCountryOverlay(!showCountryOverlay);
        setCountryOverlayUsed(!countryOverlayUsed);
    };

    const toggleLeagueOverlay = () => {
        setShowLeagueOverlay(!showLeagueOverlay);
        setLeagueOverlayUsed(!leagueOverlayUsed);
    };

    const toggleTeamOverlay = () => {
        setShowTeamOverlay(!showTeamOverlay);
        setTeamOverlayUsed(!teamOverlayUsed);
    };

    const showRandomImage = () => {
        if (pokemonImages.every(image => image.appearance)) {
            setShowModal(true);
            return;
        }

        let randomIndex;
        const availableImages = pokemonImages.filter(image => !image.appearance);
        if (availableImages.length === 0) {
            setShowModal(true);
            return;
        }

        do {
            randomIndex = Math.floor(Math.random() * pokemonImages.length);
        } while (pokemonImages[randomIndex].appearance);

        setShowCountryOverlay(true);
        setShowLeagueOverlay(true);
        setShowPlayerOverlay(true);
        setShowTeamOverlay(true);

        // Calcular puntos restantes de las opciones no utilizadas
        let additionalPoints = 10;
        if (playerOverlayUsed) additionalPoints -= 5;
        if (countryOverlayUsed) additionalPoints -= 1;
        if (leagueOverlayUsed) additionalPoints -= 2;
        if (teamOverlayUsed) additionalPoints -= 3;
        setPoints(prevPoints => prevPoints + additionalPoints);

        setTimeout(() => {
            setPokemonImages(prevImages => {
                const newImages = [...prevImages];
                newImages[randomIndex].appearance = true;
                return newImages;
            });
            setCurrentImageIndex(randomIndex);
        }, 1000);

        // Resetear el estado de las opciones utilizadas
        setPlayerOverlayUsed(false);
        setCountryOverlayUsed(false);
        setLeagueOverlayUsed(false);
        setTeamOverlayUsed(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPokemonImages(prevImages => prevImages.map(image => ({ ...image, appearance: false })));
        setPoints(10); // Reset points when modal is closed
    };

    return (
        <div className="containerPokemon">
            <div className="imgWrapper">
                {pokemonImages.length > 0 && (
                    <img src={pokemonImages[currentImageIndex].src} className="imgPokemonGuess" />
                )}
                <div className={`overlayPrincipal ${showPlayerOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay ${showCountryOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay2 ${showLeagueOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className={`overlay3 ${showTeamOverlay ? 'fade-in' : 'fade-out'}`}></div>
                <div className="overlayContainer">
                    <div className="containerButton">
                        <button className="overlayButton" onClick={togglePlayerOverlay}>Sacar imagen</button>
                        <span className="remaining">(-5)</span>
                    </div>
                    <div className="containerButton">
                        <button className="overlayButton" onClick={toggleCountryOverlay}>Sacar Pais</button>
                        <span className="remaining">(-1)</span>
                    </div>
                    <div className="containerButton">
                        <button className="overlayButton" onClick={toggleLeagueOverlay}>Sacar Liga</button>
                        <span className="remaining">(-2)</span>
                    </div>
                    <div className="containerButton">
                        <button className="overlayButton" onClick={toggleTeamOverlay}>Sacar Equipo</button>
                        <span className="remaining">(-3)</span>
                    </div>
                </div>
            </div>
            <button className="randomButton" onClick={showRandomImage}>Mostrar Aleatorio</button>
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
}