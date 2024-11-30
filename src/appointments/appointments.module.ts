import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorModule } from 'src/doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    PatientsModule,
    DoctorModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
