import { Column, DeleteDateColumn, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Team } from './team.entity';
import {UserTeam} from './userTeam.entity';

@Entity()
export class User {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => UserTeam, userTeam => userTeam.user)
userTeams: UserTeam[];

}
