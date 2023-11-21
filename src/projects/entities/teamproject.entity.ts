import { Entity, Column, ManyToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { UserTeam } from 'src/users/entities/userTeam.entity';
import { Project } from './project.entity';

@Entity()
export class Teamproject {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ManyToMany(() => UserTeam, userTeam => userTeam.teamprojects)
  @JoinColumn({ name: 'userTeamId' })
  userTeams: UserTeam[];

  @ManyToMany(() => Project, tp => tp.teamprojects)
  @JoinColumn({ name: 'tpId' })
  tp: Project[];
  
}
