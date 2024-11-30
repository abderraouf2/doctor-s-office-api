import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { Patient } from './patients/entities/patient.entity';
import { Appointment } from './appointments/entities/appointment.entity';
import { Doctor } from './doctor/entities/doctor.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import * as dotenv from 'dotenv';
dotenv.config();
console.log({ ENV: process.env });
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [Patient, Doctor, Appointment],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    }),
    DoctorModule,
    PatientsModule,
    AuthModule,
    AppointmentsModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
