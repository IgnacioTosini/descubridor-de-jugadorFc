import { ImageSchema, ImagesSchema } from './../schemas/player-schema';
import { z } from "zod";

export type ImagePlayer = z.infer<typeof ImageSchema>
export type ImagesPlayer = z.infer<typeof ImagesSchema>