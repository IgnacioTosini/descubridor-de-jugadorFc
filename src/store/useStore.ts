import { create } from 'zustand';
import { createPlayerSlice, PlayerSlice } from './playerSlice';
import { createOverlaySlice, OverlaySlice } from './overlaySlice';

type StoreState = PlayerSlice & OverlaySlice;

export const useStore = create<StoreState>((...a) => ({
    ...createPlayerSlice(...a),
    ...createOverlaySlice(...a),
}));