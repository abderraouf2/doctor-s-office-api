import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { PatientsService } from 'src/patients/patients.service';
import { DoctorService } from 'src/doctor/doctor.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly patientsService: PatientsService,
    private readonly doctorService: DoctorService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // const appointment =
    //   await this.appointmentRepository.create(createAppointmentDto);
    const doctor = await this.doctorService.findDoctorById(
      createAppointmentDto.doctor,
    );
    const patient = await this.patientsService.findPatientById(
      createAppointmentDto.patient,
    );
    const appointment = await this.appointmentRepository.create({
      ...createAppointmentDto,
      patient: patient, // Use the shorthand
      doctor: doctor,
    });
    console.log({ appointment });
    await this.appointmentRepository.save(appointment);
    return 'Appointment created successfully';
  }

  async request(createAppointmentDto: CreateAppointmentDto) {
    const doctor = await this.doctorService.findDoctorById(
      createAppointmentDto.doctor,
    );
    const patient = await this.patientsService.findPatientById(
      createAppointmentDto.patient,
    );
    const appointment = await this.appointmentRepository.create({
      ...createAppointmentDto,
      patient: patient,
      doctor: doctor,
      status: 'Pending',
    });
    console.log({ appointment });
    await this.appointmentRepository.save(appointment);
  }

  async patientAppointments(id: number): Promise<Appointment[] | []> {
    const patient = await this.patientsService.findPatientById(id);
    if (!patient) {
      throw new Error('Patient not found');
    }

    const appointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient') // Include patient
      .leftJoinAndSelect('appointment.doctor', 'doctor') // Include doctor
      .select([
        'appointment', // All fields of appointment
        'patient.id', // Only include patient ID
        'patient.name', // Only include patient name
        'doctor.id', // Only include doctor ID
        'doctor.name', // Only include doctor name
        'doctor.specialization', // Only include doctor specialization
      ])
      .where('patient.id = :id', { id })
      .getMany();
    return appointments;
  }

  async doctorAppointments(id: number): Promise<Appointment[] | []> {
    const doctor = await this.doctorService.findDoctorById(id);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    const appointments = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.patient', 'patient') // Include patient
      .leftJoinAndSelect('appointment.doctor', 'doctor') // Include doctor
      .select([
        'appointment', // All fields of appointment
        'patient.id', // Only include patient ID
        'patient.name', // Only include patient name
        'doctor.id', // Only include doctor ID
        'doctor.name', // Only include doctor name
        'doctor.specialization', // Only include doctor specialization
      ])
      .where('doctor.id = :id', { id })
      .getMany();
    console.log({ appointments, doctor: appointments[0].doctor });
    return appointments;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const { status } = updateAppointmentDto;

    if (!status) {
      throw new Error('Status is required to update the appointment.');
    }

    const result = await this.appointmentRepository.update(id, { status });

    if (result.affected === 0) {
      throw new Error(`Appointment with ID ${id} not found.`);
    }

    return `Appointment #${id} status updated to ${status}`;
  }
}
