import { IsNumber, Min } from 'class-validator';

export class TopupDTO {
  @IsNumber()
  @Min(1)
  amount!: number;
}
