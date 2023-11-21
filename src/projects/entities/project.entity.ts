import { Column, DeleteDateColumn, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Teamproject } from './teamproject.entity';


@Entity()
export class Project {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ length: 500 })
    name: string;

  
   
    @ManyToMany(() => Teamproject, tp => tp.tp)
  
    teamprojects: Teamproject[];
    

 

}