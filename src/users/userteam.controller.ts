import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UseTeamService } from './userteam.services';
import { CreateUserTeamDto } from './dto/user/create-user-team';

@Controller('userteam')
export class UserTeamController {
  constructor(private readonly userteamService: UseTeamService) {}

  @Post('create-team')
  createTeam(@Body() createTeamDto: CreateUserTeamDto) {
    return this.userteamService.create(createTeamDto);
  }

 
}