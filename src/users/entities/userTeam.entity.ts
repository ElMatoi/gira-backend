import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Team } from './team.entity';

@Entity()
export class UserTeam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'member' })
  rol: string;

  @ManyToOne(() => User, user => user.userTeams)
  @JoinColumn({ name: 'userId' })
  user: User;
  @ManyToOne(() => Team, team => team.userTeams)
  @JoinColumn({ name: 'teamId' })
  team: Team;

  
}
