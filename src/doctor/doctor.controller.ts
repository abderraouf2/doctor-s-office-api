import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { PatientAuthGuard } from 'src/guards/patient-auth.guard';
@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('new-doctor')
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @UseGuards(PatientAuthGuard)
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }
}
