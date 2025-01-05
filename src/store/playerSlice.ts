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
    loadImages: (page: number) => Promise<void>;
    showRandomImage: () => void;
    nextPage: () => void;
    prevPage: () => void;
}

const IMAGES_PER_PAGE = 10;
const RECENT_IMAGES_LIMIT = 5; // Número de imágenes recientes a mantener en el historial

const shuffleArray = (array: ImagesPlayer) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const createPlayerSlice: StateCreator<PlayerSlice & OverlaySlice, [], [], PlayerSlice> = (set, get) => ({
    playerImages: [],
    currentImageIndex: 0,
    uncoveredPlayers: [],
    currentPage: 1,
    totalPages: 0,
    recentImages: [],
    loadImages: async (page = 1) => {
        const images = await importAllImages(IMAGES_PER_PAGE * 5); // Cargar 5 páginas de imágenes aleatorias
        const parsedImages = ImagesSchema.parse(images);
        const shuffledImages = shuffleArray(parsedImages);
        const totalPages = Math.ceil(shuffledImages.length / IMAGES_PER_PAGE);
        const startIndex = (page - 1) * IMAGES_PER_PAGE;
        const endIndex = startIndex + IMAGES_PER_PAGE;
        const imagesForPage = shuffledImages.slice(startIndex, endIndex);
        const randomIndex = Math.floor(Math.random() * imagesForPage.length);
        
        console.log('Loaded images for page', page, imagesForPage); // Agrega este console.log para depurar

        set({ playerImages: imagesForPage, currentImageIndex: randomIndex, totalPages, currentPage: page });
    },
    showRandomImage: () => {
        const { playerImages, currentImageIndex, playerOverlayUsed, countryOverlayUsed, leagueOverlayUsed, teamOverlayUsed, points, currentPage, totalPages, loadImages, recentImages } = get();
        const availableImages = playerImages.filter(image => !image.appearance);

        if (availableImages.length === 0) {
            if (currentPage < totalPages) {
                loadImages(currentPage + 1);
                return;
            } else {
                set({ showModal: true });
                return;
            }
        }

        let randomIndex;
        let seed = Math.floor(Math.random() * Date.now());
        const seededRandom = (min: number, max: number) => {
            const x = Math.sin(seed++) * 10000;
            return Math.floor((x - Math.floor(x)) * (max - min) + min);
        };

        do {
            randomIndex = seededRandom(0, playerImages.length);
        } while (playerImages[randomIndex].appearance || recentImages.includes(playerImages[randomIndex].src));

        set({
            showPlayerOverlay: false,
            showCountryOverlay: false,
            showLeagueOverlay: false,
            showTeamOverlay: false,
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

                return { playerImages: newImages, currentImageIndex: randomIndex, uncoveredPlayers: newUncoveredPlayers, recentImages: newRecentImages };
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
                showCountryOverlay: true,
                showLeagueOverlay: true,
                showTeamOverlay: true,
            });
        }, 2000);
    },
    nextPage: () => {
        const { currentPage, totalPages, loadImages } = get();
        if (currentPage < totalPages) {
            loadImages(currentPage + 1);
        }
    },
    prevPage: () => {
        const { currentPage, loadImages } = get();
        if (currentPage > 1) {
            loadImages(currentPage - 1);
        }
    },
});