import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teamproject } from './entities/teamproject.entity';
import { CreateTeamProjectDto } from './dto/create-teamproject.dto';


@Injectable()
export class ProjectTeamService {
  constructor(
    @InjectRepository(Teamproject)
    private readonly teamprojectRepository: Repository<Teamproject>
  ){}

  createProject(createteamProjectDto: CreateTeamProjectDto) {
    return this.teamprojectRepository.save(createteamProjectDto);
  }

  async findOneByTeamIdAndProjectId(projectId: number): Promise<Teamproject | null> {
    try {
      const projectTeam = await this.teamprojectRepository.findOne({
        where: { project: { id: projectId }},
      });
  
      return projectTeam || null;
    } catch (error) {
      // Manejar errores si es necesario
      console.error("Error ", error);
      return null;
    }
  }
  



 


  

 
}



