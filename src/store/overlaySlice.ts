import { StateCreator } from 'zustand';
import { PlayerSlice } from './playerSlice';

export type OverlaySlice = {
    showPlayerOverlay: boolean;
    showNameOverlay: boolean;
    showCountryOverlay: boolean;
    showLeagueOverlay: boolean;
    showTeamOverlay: boolean;
    showModal: boolean;
    points: number;
    playerOverlayUsed: boolean;
    countryOverlayUsed: boolean;
    leagueOverlayUsed: boolean;
    teamOverlayUsed: boolean;
    playerOverlayDisabled: boolean;
    countryOverlayDisabled: boolean;
    leagueOverlayDisabled: boolean;
    teamOverlayDisabled: boolean;
    togglePlayerOverlay: () => void;
    toggleCountryOverlay: () => void;
    toggleLeagueOverlay: () => void;
    toggleTeamOverlay: () => void;
    handleCloseModal: () => void;
    handleIncorrect: () => void;
    setShowModal: (show: boolean) => void;
}

export const createOverlaySlice: StateCreator<OverlaySlice & PlayerSlice, [], [], OverlaySlice> = (set, get) => ({
    showPlayerOverlay: true,
    showNameOverlay: true,
    showCountryOverlay: true,
    showLeagueOverlay: true,
    showTeamOverlay: true,
    showModal: false,
    points: 0,
    playerOverlayUsed: false,
    countryOverlayUsed: false,
    leagueOverlayUsed: false,
    teamOverlayUsed: false,
    playerOverlayDisabled: false,
    countryOverlayDisabled: false,
    leagueOverlayDisabled: false,
    teamOverlayDisabled: false,
    togglePlayerOverlay: () => {
        const { showPlayerOverlay, playerOverlayUsed } = get();
        set({ showPlayerOverlay: !showPlayerOverlay, playerOverlayUsed: !playerOverlayUsed, playerOverlayDisabled: true });
    },
    toggleCountryOverlay: () => {
        const { showCountryOverlay, countryOverlayUsed } = get();
        set({ showCountryOverlay: !showCountryOverlay, countryOverlayUsed: !countryOverlayUsed, countryOverlayDisabled: true });
    },
    toggleLeagueOverlay: () => {
        const { showLeagueOverlay, leagueOverlayUsed } = get();
        set({ showLeagueOverlay: !showLeagueOverlay, leagueOverlayUsed: !leagueOverlayUsed, leagueOverlayDisabled: true });
    },
    toggleTeamOverlay: () => {
        const { showTeamOverlay, teamOverlayUsed } = get();
        set({ showTeamOverlay: !showTeamOverlay, teamOverlayUsed: !teamOverlayUsed, teamOverlayDisabled: true });
    },
    handleCloseModal: () => {
        set(state => ({
            showModal: false,
            playerImages: state.playerImages.map(image => ({ ...image, appearance: false })),
            points: 10,
        }));
    },
    handleIncorrect: () => {
        const { points } = get();
        set({ points: points - 5 });
    },
    setShowModal: (show: boolean) => {
        set({ showModal: show });
    },
});