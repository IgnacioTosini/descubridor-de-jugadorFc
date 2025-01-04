import { StateCreator } from 'zustand';
import { ImagesPlayer } from '../types';
import { importAllImages } from '../data/fcImagesPlayers';
import { ImagesSchema } from '../schemas/player-schema';
import { OverlaySlice } from './overlaySlice';

export type PlayerSlice = {
    playerImages: ImagesPlayer;
    currentImageIndex: number;
    uncoveredPlayers: ImagesPlayer;
    loadImages: () => Promise<void>;
    showRandomImage: () => void;
}

export const createPlayerSlice: StateCreator<PlayerSlice & OverlaySlice, [], [], PlayerSlice> = (set, get) => ({
    playerImages: [],
    currentImageIndex: 0,
    uncoveredPlayers: [],
    loadImages: async () => {
        const images = await importAllImages();
        const parsedImages = ImagesSchema.parse(images);
        const randomIndex = Math.floor(Math.random() * parsedImages.length);
        set({ playerImages: parsedImages, currentImageIndex: randomIndex });
    },
    showRandomImage: () => {
        const { playerImages, currentImageIndex, playerOverlayUsed, countryOverlayUsed, leagueOverlayUsed, teamOverlayUsed, points } = get();
        if (playerImages.every(image => image.appearance)) {
            set({ showModal: true });
            return;
        }

        let randomIndex;
        const availableImages = playerImages.filter(image => !image.appearance);
        if (availableImages.length === 0) {
            set({ showModal: true });
            return;
        }

        let seed = Math.floor(Math.random() * Date.now());
        const seededRandom = (min: number, max: number) => {
            const x = Math.sin(seed++) * 10000;
            return Math.floor((x - Math.floor(x)) * (max - min) + min);
        };

        do {
            randomIndex = seededRandom(0, playerImages.length);
        } while (playerImages[randomIndex].appearance);

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
                return { playerImages: newImages, currentImageIndex: randomIndex, uncoveredPlayers: newUncoveredPlayers };
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
});