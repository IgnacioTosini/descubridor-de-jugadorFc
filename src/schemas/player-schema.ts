import { z } from 'zod';

export const ImageSchema = z.object({
    src: z.string(),
    appearance: z.boolean(),
});

export const ImagesSchema = z.array(ImageSchema);