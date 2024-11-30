import { IsString, IsEmail, Length } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 10)
  password: string;

  @IsString()
  specialization: string;
}
