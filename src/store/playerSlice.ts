import { StateCreator } from 'zustand';
import { ImagesPlayer } from '../types';
import { importAllImages } from '../data/fcImagesPlayers';
import { ImagesSchema } from '../schemas/player-schema';
import { OverlaySlice } from './overlaySlice';

export type PlayerSlice = {
    playerImages: ImagesPlayer;
    currentImageIndex: number;
    uncoveredPlayers: ImagesPlayer;
    currentPage: number;
    totalPages: number;
    recentImages: string[]; // Historial de imágenes recientes
    isCorrectButtonDisabled: boolean;
    isLoading: boolean; // Estado para controlar la visibilidad del Spinner
    allPlayersDiscovered: boolean; // Estado para controlar si todos los jugadores han sido descubiertos
    loadImages: (page: number) => Promise<void>;
    showRandomImage: () => void;
    reloadImage: () => void;
}

const IMAGES_PER_PAGE = 10;
const RECENT_IMAGES_LIMIT = 5; // Número de imágenes recientes a mantener en el historial

export const createPlayerSlice: StateCreator<PlayerSlice & OverlaySlice, [], [], PlayerSlice> = (set, get) => ({
    playerImages: [],
    currentImageIndex: 0,
    uncoveredPlayers: [],
    currentPage: 1,
    totalPages: 0,
    recentImages: [],
    isCorrectButtonDisabled: false,
    isLoading: false, // Inicializar el estado isLoading
    allPlayersDiscovered: false, // Inicializar el estado allPlayersDiscovered
    loadImages: async (page = 1) => {
        const images = await importAllImages(IMAGES_PER_PAGE * 5); // Cargar 5 páginas de imágenes aleatorias
        const parsedImages = ImagesSchema.parse(images);
        const totalPages = Math.ceil(parsedImages.length / IMAGES_PER_PAGE);
        const startIndex = (page - 1) * IMAGES_PER_PAGE;
        const endIndex = startIndex + IMAGES_PER_PAGE;
        const imagesForPage = parsedImages.slice(startIndex, endIndex);
        const randomIndex = Math.floor(Math.random() * imagesForPage.length);

        console.log('Loaded images for page', page, imagesForPage); // Agrega este console.log para depurar

        set({ playerImages: imagesForPage, currentImageIndex: randomIndex, totalPages, currentPage: page, allPlayersDiscovered: false });
    },
    showRandomImage: () => {
        const { playerImages, currentImageIndex, playerOverlayUsed, countryOverlayUsed, leagueOverlayUsed, teamOverlayUsed, points, currentPage, totalPages, loadImages, recentImages } = get();
        const availableImages = playerImages.filter(image => !image.appearance);

        if (availableImages.length === 0) {
            if (currentPage < totalPages) {
                loadImages(currentPage + 1);
                return;
            } else {
                set({ showModal: true, allPlayersDiscovered: true });
                return;
            }
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playerImages.length);
        } while (playerImages[randomIndex].appearance || recentImages.includes(playerImages[randomIndex].src));

        set({
            showPlayerOverlay: false,
            showNameOverlay: false,
            showCountryOverlay: false,
            showLeagueOverlay: false,
            showTeamOverlay: false,
            isCorrectButtonDisabled: true,
        });

        setTimeout(() => {
            set(state => {
                const newImages = [...state.playerImages];
                newImages[currentImageIndex].appearance = true;
                const newUncoveredPlayers = [...state.uncoveredPlayers, newImages[currentImageIndex]];

                // Actualizar el historial de imágenes recientes
                const newRecentImages = [...state.recentImages, newImages[currentImageIndex].src];
                if (newRecentImages.length > RECENT_IMAGES_LIMIT) {
                    newRecentImages.shift(); // Eliminar la imagen más antigua si se supera el límite
                }

                return { playerImages: newImages, currentImageIndex: randomIndex, uncoveredPlayers: newUncoveredPlayers, recentImages: newRecentImages, isCorrectButtonDisabled: false };
            });

            // Calculate and set points
            let additionalPoints = 10;
            if (playerOverlayUsed) additionalPoints -= 5;
            if (countryOverlayUsed) additionalPoints -= 1;
            if (leagueOverlayUsed) additionalPoints -= 2;
            if (teamOverlayUsed) additionalPoints -= 2;
            set({ points: points + additionalPoints });

            // Reset the used and disabled overlays
            set({
                playerOverlayUsed: false,
                countryOverlayUsed: false,
                leagueOverlayUsed: false,
                teamOverlayUsed: false,
                playerOverlayDisabled: false,
                countryOverlayDisabled: false,
                leagueOverlayDisabled: false,
                teamOverlayDisabled: false,
            });

            // Check if all images in the current page are uncovered and load the next page if necessary
            const { playerImages: updatedPlayerImages, currentPage: updatedCurrentPage, totalPages: updatedTotalPages } = get();
            if (updatedPlayerImages.every(image => image.appearance) && updatedCurrentPage < updatedTotalPages) {
                loadImages(updatedCurrentPage + 1);
            }
        }, 3000);

        setTimeout(() => {
            set({
                showPlayerOverlay: true,
                showNameOverlay: true,
                showCountryOverlay: true,
                showLeagueOverlay: true,
                showTeamOverlay: true,
            });
        }, 2000);
    },
    reloadImage: () => {
        const { playerImages, currentImageIndex } = get();
        const availableImages = playerImages.filter(image => !image.appearance);

        if (availableImages.length > 0) {
            const nextIndex = (currentImageIndex + 1) % playerImages.length;
            set({ isLoading: true }); // Mostrar el Spinner
            setTimeout(() => {
                set({ currentImageIndex: nextIndex, isCorrectButtonDisabled: playerImages[nextIndex].appearance, isLoading: false }); // Ocultar el Spinner
            }, 1500);
        } else {
            set({ isCorrectButtonDisabled: true });
        }
        set({
            showPlayerOverlay: true,
            showNameOverlay: true,
            showCountryOverlay: true,
            showLeagueOverlay: true,
            showTeamOverlay: true,
            playerOverlayUsed: false,
            countryOverlayUsed: false,
            leagueOverlayUsed: false,
            teamOverlayUsed: false,
            playerOverlayDisabled: false,
            countryOverlayDisabled: false,
            leagueOverlayDisabled: false,
            teamOverlayDisabled: false,
        });
    }
});