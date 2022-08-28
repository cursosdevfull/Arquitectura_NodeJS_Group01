import { IsNotEmpty, IsString } from 'class-validator';

export class BookCreateDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser un texto' })
  title: string;

  @IsString({ message: 'El autor debe ser un texto' })
  author: string;
}
