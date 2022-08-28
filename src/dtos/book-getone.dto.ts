import { IsNumber } from 'class-validator';

export class BookGetOneDto {
  //@Type(() => Number)
  @IsNumber()
  identificador: number;
}
