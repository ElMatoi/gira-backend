import { Entity, PrimaryGeneratedColumn, Column,  JoinColumn, ManyToOne,ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Team } from './team.entity';
import { Teamproject } from 'src/projects/entities/teamproject.entity';

@Entity()
export class UserTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'member' })
  rol: string;

  @ManyToOne(() => User, user => user.userTeams) // user.userTeams
  @JoinColumn({ name: 'userId' })
  user: User;
  
  @ManyToOne(() => Team, team => team.userTeams) //
  @JoinColumn({ name: 'teamId' })
  team: Team;

  @ManyToMany(() => Teamproject, teamproject => teamproject.userTeam)
  teamprojects: Teamproject[];

  
}
