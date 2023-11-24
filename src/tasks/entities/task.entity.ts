import { Column, DeleteDateColumn, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Teamproject } from 'src/projects/entities/teamproject.entity';

@Entity()
export class Task {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  startDate: string;

  @Column({ type: 'varchar', nullable: true })
  endDate: string;


  
  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: 'userId' }) 
  user: User;
  @ManyToOne(() => User, userCharge => userCharge.tasks)
  @JoinColumn({ name: 'userId' }) 
  userCharge: User;

  @ManyToOne(()=>Teamproject,teamproject=>teamproject.tasks)
  @JoinColumn({name:'TeamProjectId'})
  teamproject:Teamproject;



}
