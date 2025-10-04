import { createZodDto } from 'nestjs-zod';
import { createFilmSchema } from './create-film.dto';

const updateFilmDtoSchema = createFilmSchema.partial();     // เรามี Validation ที่ดีอยู่แล้วใน Create แค่ import มาใช้ (partial = ใช้บางส่วน)

export class UpdateFilmDto extends createZodDto(
  updateFilmDtoSchema,
) {}