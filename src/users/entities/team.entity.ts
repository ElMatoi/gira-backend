import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import {UserTeam} from './userTeam.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, default: 'Default name'})
  name: string;

  @ManyToMany(() => UserTeam, userTeam => userTeam.team)
  userTeams: UserTeam[];
}