import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from "./dto/create-project.dto";
import { Repository } from 'typeorm';
import { Project } from "./entities/project.entity";
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ){}

  createProject(createProjectDto: CreateProjectDto) {
    return this.projectRepository.save(createProjectDto);
  }

  findOneByName(name: string){
    return this.projectRepository.findOneBy({name})
  }
  

  async findAll() {
    return this.projectRepository.find();
  }



  

 
}





