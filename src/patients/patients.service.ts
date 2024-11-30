import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientsRepository: Repository<Patient>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async create(
    createPatientDto: CreatePatientDto,
  ): Promise<{ patient: { id: number; name: string } } | { message: string }> {
    const patientExist = await this.findPatientByEmail(createPatientDto.email);
    if (patientExist) {
      return { message: 'Patient already exists' };
    }
    const hashedPassword = await this.hashPassword(createPatientDto.password);

    const patient = this.patientsRepository.create({
      ...createPatientDto,
      password: hashedPassword,
    });

    await this.patientsRepository.save(patient);
    return { patient: { id: patient.id, name: patient.name } };
  }

  async findPatientByEmail(email: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({ where: { email } });
    return patient;
  }

  async findPatientById(id: number): Promise<Patient | null> {
    return this.patientsRepository.findOne({ where: { id } });
  }

  async findAll() {
    const patients = await this.patientsRepository.find();
    console.log({ patients });
    return patients;
  }
}
