import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorsRepository: Repository<Doctor>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async create(
    createDoctorDto: CreateDoctorDto,
  ): Promise<{ doctor: { id: number; name: string } } | { message: string }> {
    const doctorExists = await this.findDoctorByEmail(createDoctorDto.email);
    if (doctorExists) {
      return { message: 'Doctor already exists' };
    }
    const hashedPassword = await this.hashPassword(createDoctorDto.password);

    // Create a new User instance
    const newDoctor = this.doctorsRepository.create({
      ...createDoctorDto,
      password: hashedPassword,
    });

    await this.doctorsRepository.save(newDoctor);
    return { doctor: { id: doctorExists.id, name: doctorExists.name } };
  }

  async findDoctorByEmail(email: string): Promise<Doctor | null> {
    return await this.doctorsRepository.findOne({ where: { email } });
  }

  async findDoctorById(id: number): Promise<Doctor | null> {
    return await this.doctorsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Doctor[]> {
    const doctors = await this.doctorsRepository.find({
      select: ['name', 'specialization'],
    });
    console.log({ doctors });
    return doctors;
  }
}
