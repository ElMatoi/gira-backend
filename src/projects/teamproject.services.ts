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

 


  

 
}



