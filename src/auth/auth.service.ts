import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { DoctorService } from '../doctor/doctor.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PatientsService } from 'src/patients/patients.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly patientsService: PatientsService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto, role: string): Promise<string> {
    const { email, password } = authDto;
    let user;
    if (role === 'doctor') {
      user = await this.doctorService.findDoctorByEmail(email);
    } else if (role === 'patient') {
      user = await this.patientsService.findPatientByEmail(email);
    } else {
      throw new UnauthorizedException('Invalid role');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email, role: role };

    const token = await this.jwtService.signAsync(payload);

    console.log({ token });
    return token;
  }
}
