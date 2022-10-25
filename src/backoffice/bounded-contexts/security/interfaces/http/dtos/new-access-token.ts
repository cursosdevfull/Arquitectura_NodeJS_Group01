import { IsNotEmpty } from 'class-validator';

export class NewAccessTokenDto {
  @IsNotEmpty()
  refreshToken: string;
}
