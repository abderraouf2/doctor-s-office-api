import { IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsString()
  reason: string;

  @IsNumber()
  patient: number;

  @IsNumber()
  doctor: number;
}
