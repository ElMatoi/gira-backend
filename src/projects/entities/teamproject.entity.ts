import { Entity, Column, ManyToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne,OneToMany } from 'typeorm';
import { UserTeam } from 'src/users/entities/userTeam.entity';
import { Project } from './project.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
export class Teamproject {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  startDate: string;

  @Column({ type: 'varchar', nullable: true })
  endDate: string;

  @ManyToOne(() => UserTeam, userTeam => userTeam.teamprojects)
  @JoinColumn({ name: 'userTeamId' })
  userTeam: UserTeam;

  @ManyToOne(() => Project, project => project.teamprojects)
  @JoinColumn({ name: 'projectId' })
  project: Project;
  @OneToMany(() => Task, task => task.user) // 'user' debe coincidir con el nombre de la propiedad en la entidad de tarea
    tasks: Task[];
  
}
