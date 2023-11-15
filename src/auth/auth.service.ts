import {BadRequestException, Injectable,UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { TeamService } from "src/users/teams.service";
import { UseTeamService } from "src/users/userteam.services";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { CreateTeamDto } from "./dto/createteam.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { UpdateUserDto } from "src/users/dto/user/update-user.dto";
import { UpdateTeamUserDto } from "./dto/updateteamuser.dto";
import {DeleteTeamDto} from "./dto/deleteTeam";
import { Showteamuserdto } from "./dto/showteamuserdto";
import { JwtService } from "@nestjs/jwt";
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class AuthService{
    constructor(
      private readonly usersService: UsersService,
      private readonly teamService: TeamService,
      private readonly userteamService : UseTeamService,
      private readonly jwtService: JwtService){} // variable que almacena los metodos


      async addUserToTeamByEmail({name, email,rol}:UpdateTeamUserDto) {  /// en el mismo boton que ingresa el quipo, que envie para esta peticion
        const team=await this.teamService.findOneByName(name); 
        const user = await this.usersService.findOneByEmail(email);

      
        if (!team || !user) {
          // Handle errors, e.g., team or user not found
          throw new NotFoundException('Team or user not found');
        }
      
        const createUserTeam= await this.userteamService.create({
          user,
          team,
          rol,
        });
        //team.users.push(user);
        const usersInTeam = await this.userteamService.findUsersByTeamId(team.id);
        return usersInTeam;
     

        /*const updateRolDto=new UpdateRolUserDto();
        updateRolDto.role=rol;
        await this.usersService.resetRol(user.id,updateRolDto);*/


        
        //team.users.push(user);
      
        // Save the updated team
        //return this.teamService.createTeam(team);
        
      }
      async showTeamUser({email}:Showteamuserdto){
        const user = await this.usersService.findOneByEmail(email);

        const userteam=await this.userteamService.showTeamUser(user.id);
        return userteam
      }


      async deleteTeam({name}:DeleteTeamDto){
        const team=await this.teamService.findOneByName(name);
        
        if (!team ) {
          // Handle errors, e.g., team or user not found
          throw new NotFoundException('Team  not found');
        }
        await this.teamService.deleteByName(name);
        await this.userteamService.removeAllUsersFromTeam(team.id);




      }



    async createTeam({name}:CreateTeamDto){
      const team=await this.teamService.findOneByName(name); 
      if(team){
        throw new BadRequestException('Ya existe un equipo con ese nombre');
      }
      const createTeam=await this.teamService.createTeam({
        name

      });
      return createTeam;

      
    }
    private generateToken(userId: number): string {
      // ervicio JwtService para generar token
      const payload = { sub: userId }; 
      const token = this.jwtService.sign(payload);
  
      return token;
    }
    
    async register({ name, email, password }: RegisterDto) {
      const user = await this.usersService.findOneByEmail(email); // pregunta si existe el usuario en la base
      if (user) {
        throw new BadRequestException('Ya existe un usuario con ese correo');
      }
    
      // Llama al método create del userServicio y lo mete a la base de datos
      const createdUser = await this.usersService.create({
        name,
        email,
        password,
      });
      const token = this.generateToken(createdUser.id);

      return token;
    
      
      
    }
    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);
        
        if (!user) {
          throw new UnauthorizedException('email incorrecto');
        }
      
        
        if (!password) {
          throw new UnauthorizedException('contraseña incorrecta');
        }

        const payload = { email: user.email };

        const token = await this.jwtService.signAsync(payload);

        return {
          token,
          email,
        };
        
      }
      
    
    async resetPassword({ email, newPassword }: ResetPasswordDto) {
      // Buscar al usuario por correo electrónico
      const user = await this.usersService.findOneByEmail(email);
    
      
    
      // Actualizar la contraseña solo para el usuario encontrado
      const updateUserDto = new UpdateUserDto();
      updateUserDto.password = newPassword;
    
      await this.usersService.resetPass(user.id, updateUserDto); // Se asume que resetPass toma el ID del usuario como primer argumento
    
      return user;
    }
    
      
    
}
  
  
  
  