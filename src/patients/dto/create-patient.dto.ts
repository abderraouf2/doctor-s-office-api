import { IsEmail, IsString, Length } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 12)
  password: string;

  @IsString()
  address: string;

  @IsString()
  date_of_birth: string; // Should be date, but I made it string to facilitate testing purposes
}
