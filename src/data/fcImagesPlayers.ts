import { ImagesPlayer } from "../types";

export async function importAllImages(): Promise<ImagesPlayer> {
    const modules = import.meta.glob('../assets/fc-Image/*.{png,jpg,jpeg,webp}');
    const images: ImagesPlayer = [];

    for (const path in modules) {
        const module = await modules[path]() as { default: string };
        images.push({ src: module.default, appearance: false });
    }

    return images;
}