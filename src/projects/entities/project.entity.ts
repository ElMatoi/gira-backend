import { Column, DeleteDateColumn, Entity, ManyToMany, OneToMany } from 'typeorm';
import { Teamproject } from './teamproject.entity';



@Entity()
export class Project {
    @Column({ primary: true, generated: true })
    id: number;

    @Column({ length: 500 })
    name: string;
    
    @ManyToMany(() => Teamproject, teamproject => teamproject.project)
    teamprojects: Teamproject[];
    
    
 

}