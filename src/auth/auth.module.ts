import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DoctorModule } from '../doctor/doctor.module';
import { JwtModule } from '@nestjs/jwt';
import { PatientsModule } from 'src/patients/patients.module';
import { jwtConstants } from './constants';
@Module({
  imports: [
    DoctorModule,
    PatientsModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
