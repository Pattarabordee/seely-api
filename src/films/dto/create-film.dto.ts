import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createFilmSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    year: z.int().min(1000, 'Year must be after 1800').max(9999, 'Year must be before 9999'),
    review_description: z.string().min(1, 'Review description is required'),
    imageUrl: z.url('Image must be a valid URL').optional(),
    genres: z.object({
      id: z
        .number()
        .int()
        .min(1, 'genre.id must be a number between 1 - 5')
        .max(5, 'genre.id must be a number between 1 - 5'),
    }),
    filmRating: z.object({
      id: z
        .number()
        .int()
        .min(1, 'filmRating.id must be a number between 1 - 6')
        .max(6, 'filmRating.id must be a number between 1 - 6'),
    }),
  })
  .strict();

export class CreateFilmDto extends createZodDto(createFilmSchema) {}
