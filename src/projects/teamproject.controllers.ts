import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

import { CreateTeamProjectDto } from './dto/create-teamproject.dto';
import { ProjectTeamService } from './teamproject.services';

@Controller('teamproject')
export class TeamProjectController {
  constructor(private readonly teamProjectService: ProjectTeamService) {}

  @Post('team-project')
  createTeam(@Body() createTeamProjectDto: CreateTeamProjectDto) {
    return this.teamProjectService.createProject(createTeamProjectDto);
  }


 
}