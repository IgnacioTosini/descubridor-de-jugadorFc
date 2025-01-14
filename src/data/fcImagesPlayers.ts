import { ImagesPlayer } from "../types";

const shuffledPathsCache: { [key: string]: string[] } = {};

export async function importAllImages(limit: number): Promise<ImagesPlayer> {
    const modules = import.meta.glob('../assets/fc-Image/*.{webp,jpg,jpeg,png}');
    const allPaths = Object.keys(modules);
    const cacheKey = '../assets/fc-Image/*.{webp,jpg,jpeg,png}';

    if (!shuffledPathsCache[cacheKey]) {
        shuffledPathsCache[cacheKey] = allPaths.sort(() => 0.5 - Math.random());
    }

    const selectedPaths = shuffledPathsCache[cacheKey].slice(0, limit);
    const images: ImagesPlayer = [];

    for (const path of selectedPaths) {
        try {
            const module = await modules[path]() as { default: string };
            images.push({ src: module.default, appearance: false });
        } catch (error) {
            console.error('Error loading module:', path, error); // Agrega este console.log para depurar errores
        }
    }

    return images;
}

export async function importAllImagesOpacity(limit: number): Promise<ImagesPlayer> {
    const modules = import.meta.glob('../assets/players/*.{webp,jpg,jpeg,png}');
    const allPaths = Object.keys(modules);
    const shuffledPaths = allPaths.sort(() => 0.5 - Math.random());
    const selectedPaths = shuffledPaths.slice(0, limit);
    const images: ImagesPlayer = [];

    for (const path of selectedPaths) {
        try {
            const module = await modules[path]() as { default: string };
            images.push({ src: module.default, appearance: false });
        } catch (error) {
            console.error('Error loading module:', path, error); // Agrega este console.log para depurar errores
        }
    }

    return images;
}