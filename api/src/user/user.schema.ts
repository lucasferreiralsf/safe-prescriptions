import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  BOTH = 'both',
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  emailIsVerified: boolean;
  emailToken: string;
  emailTokenExpirationDate: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 200 })
  firstName: string;
  @Column('varchar', { length: 200 })
  lastName: string;
  @Column('varchar', { length: 100 })
  password: string;
  @Column()
  email: string;
  @Column({
    type: 'boolean',
    default: false,
  })
  emailIsVerified: boolean;
  @Column()
  emailToken: string;
  @Column()
  emailTokenExpirationDate: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PATIENT,
  })
  role: UserRole;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 12);
    }
  }
}
