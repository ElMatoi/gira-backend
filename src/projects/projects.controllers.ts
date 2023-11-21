import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { ProjectService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';


@Controller('project')
export class ProjectsController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }
  @Post()
 
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  
  @Get()
  findAllTeams() {
  return this.projectService.findAll();
}

 
}
