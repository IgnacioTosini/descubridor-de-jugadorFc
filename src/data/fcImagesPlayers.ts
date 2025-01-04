import { ImagesPlayer } from "../types";

export async function importAllImages(): Promise<ImagesPlayer> {
    const modules = import.meta.glob('../assets/fc-Image-webp/*.{webp,jpg,jpeg,png}');
    console.log('Modules:', modules); // Agrega este console.log para depurar

    const images: ImagesPlayer = [];

    for (const path in modules) {
        console.log('Path:', path); // Agrega este console.log para depurar
        try {
            const module = await modules[path]() as { default: string };
            console.log('Module:', module); // Agrega este console.log para depurar
            images.push({ src: module.default, appearance: false });
        } catch (error) {
            console.error('Error loading module:', path, error); // Agrega este console.log para depurar errores
        }
    }

    console.log('Imported images:', images); // Agrega este console.log para depurar

    return images;
}