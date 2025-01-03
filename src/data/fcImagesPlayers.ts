import { Image } from "../types";

export async function importAllImages(): Promise<Image[]> {
    const modules = import.meta.glob('../assets/fc-Image/*.{png,jpg,jpeg,webp}');
    const images: Image[] = [];

    for (const path in modules) {
        const module = await modules[path]() as { default: string };
        images.push({ src: module.default, appearance: false });
    }

    return images;
}