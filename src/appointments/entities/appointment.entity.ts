import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Appointments' })
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  time: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({ type: 'text', default: 'Approved' }) // states: Pending, Approved, Rejected, and Canceled
  status: string;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  doctor: Doctor;
}
