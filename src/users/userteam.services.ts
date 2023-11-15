import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user/create-user.dto';
import { CreateUserTeamDto } from './dto/user/create-user-team';
import { Repository } from 'typeorm';
import { UpdateRolUserDto } from './dto/user/update-roluser.dto';
import {UserTeam} from './entities/userTeam.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';


export class UseTeamService {
    constructor(
      @InjectRepository(UserTeam)
      private readonly userTeamRepository: Repository<UserTeam>
    ){}
  
    create(CreateUserTeamDto: CreateUserTeamDto) {
      return this.userTeamRepository.save(CreateUserTeamDto);
    }

    
    async findUsersByTeamId(teamId: number) {
      //  buscar los registros de la tabla intermedia UserTeam
      // que pertenecen al equipo con el ID especificado.
      return this.userTeamRepository.find({
        where: { team: { id: teamId } }, // busca por el ID del equipo
        relations: ['team'], //printea todos los usuarios con la relacion team-user
      });
    }
    async showTeamUser(userId:number){
      return this.userTeamRepository.find({
        where:{user:{id:userId}},
        relations:['team']

      })

    }
    async removeAllUsersFromTeam(teamId: number): Promise<DeleteResult> {
      // Elimina todos los registros de UserTeam que pertenecen al equipo con el ID especificado.
      return this.userTeamRepository
        .createQueryBuilder()
        .delete()
        .from(UserTeam)
        .where('teamId = :teamId', { teamId })
        .execute();
    }
   
}