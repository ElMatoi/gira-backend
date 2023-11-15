import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TeamService } from './teams.service';
import { CreateTeamDto } from './dto/user/create-team.dto';
import { UpdateTeamDto } from './dto/user/update-team.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create-team')
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Get()
  findAllTeams() {
  return this.teamService.findAllTeams();
}

  
}