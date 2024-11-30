import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PatientAuthGuard } from 'src/guards/patient-auth.guard';
import { DoctorAuthGuard } from 'src/guards/doctor-auth.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(DoctorAuthGuard)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @UseGuards(PatientAuthGuard)
  @Post('request')
  request(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.request(createAppointmentDto);
  }

  @UseGuards(PatientAuthGuard)
  @Get('patient-appointments/:id')
  patientAppointments(@Param('id') id: string) {
    return this.appointmentsService.patientAppointments(+id);
  }

  @UseGuards(DoctorAuthGuard)
  @Get('doctor-appointments/:id')
  doctorAppointments(@Param('id') id: string) {
    return this.appointmentsService.doctorAppointments(+id);
  }

  @UseGuards(DoctorAuthGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }
}
