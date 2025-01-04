import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = path.join(__dirname, 'src/assets/fc-Image');
const outputDir = path.join(__dirname, 'src/assets/fc-Image-webp');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading input directory', err);
        return;
    }

    files.forEach(file => {
        const inputFilePath = path.join(inputDir, file);
        const outputFilePath = path.join(outputDir, `${path.parse(file).name}.webp`);

        sharp(inputFilePath)
            .webp({ quality: 80 })
            .toFile(outputFilePath, (err) => {
                if (err) {
                    console.error('Error converting file', file, err);
                } else {
                    console.log('Converted', file, 'to', outputFilePath);
                }
            });
    });
});