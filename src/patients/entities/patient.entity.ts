import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true, nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  date_of_birth: string; // made string for dev purposes

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    nullable: true,
  })
  appointments: Appointment[];
}
