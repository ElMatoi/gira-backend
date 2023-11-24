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
import { CreateProjectDto } from "./dto/createProject.dto";
import { TeamProjectDto } from "./dto/teamProject.dto";
import { ProjectService } from "src/projects/projects.service";
import { ProjectTeamService } from "src/projects/teamproject.services";
import { TaskService } from "src/tasks/task.services";
import { CreateTaskDto } from "./dto/createTask.dto";


@Injectable()
export class AuthService{
    constructor(
      private readonly usersService: UsersService,
      private readonly teamService: TeamService,
      private readonly userteamService : UseTeamService,
      private readonly projectsService: ProjectService,
      private readonly tprojService: ProjectTeamService,
      private readonly taskService: TaskService,
      private readonly jwtService: JwtService){} // variable que almacena los metodos


      async addUserToTeamByEmail({name, email,rol}:UpdateTeamUserDto) {  // add user in team
        /// en el mismo boton que ingresa el quipo, que envie para esta peticion
        const team=await this.teamService.findOneByName(name); 
        const user = await this.usersService.findOneByEmail(email);
        console.log(user);
        console.log(team);
        if (!team || !user) {
          // Handle errors, e.g., team or user not found
          throw new NotFoundException('Team or user not found');
        }
      const createUserTeam= await this.userteamService.create({
          user,
          team,
          rol,
        });
        const usersInTeam = await this.userteamService.findUsersByTeamId(team.id);
        
        return true;
        
        
      }
      //////////////////////////////////////////////////////////////////////////////
      async createTeam({name}:CreateTeamDto){//create team
        const team=await this.teamService.findOneByName(name); 
        if(team){
          throw new BadRequestException('Ya existe un equipo con ese nombre');
        }
        const createTeam=await this.teamService.createTeam({
          name
  
        });
        return true;
      }
      /////////////////////////////////////////////////////////////////////////////////////
      async createProject({name,email}:CreateProjectDto){ //create project
        const user = await this.usersService.findOneByEmail(email);
  
        const createProject =await this.projectsService.createProject({
          name
  
        });
        return true;
      }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      async addProjectTeam({ nameProject, nameTeam, emailUser, description, startDate, endDate }: TeamProjectDto) {
        const user = await this.usersService.findOneByEmail(emailUser);
        const team = await this.teamService.findOneByName(nameTeam);
        const userTeam = await this.userteamService.findOneByUserIdAndTeamId(user.id, team.id);
  
        console.log(user);
        console.log(team);
        console.log(userTeam);
  
      
        const project = await this.projectsService.findOneByName(nameProject);
        console.log(project);
      
      
        
        const createTeamProject = await this.tprojService.createProject({
          userTeam,
          project,
          description,
          startDate,
          endDate 
        });
      
        return true;
      }
      /////////////////////////////////////////////////////////////////////////////
      async createTask ({name,emailCharge,emailCreator,nameProject,description,startDate,endDate}:CreateTaskDto){
        const user= await this.usersService.findOneByEmail(emailCreator);
        const userCharge= await this.usersService.findOneByEmail(emailCharge);
        const project= await this.projectsService.findOneByName(nameProject);
        const teamproject= await this.tprojService.findOneByTeamIdAndProjectId(project.id);
        const createTask= await this.taskService.create({
          name,
          user,
          userCharge,
          teamproject,
          description,
          startDate,
          endDate




        })
        return createTask;

      }




      ///////////////////////////////////////////////////////////////////////////////
      
      async showTeamUser({email}:Showteamuserdto){ // show rols and teams whith projects of user in specific
        const user = await this.usersService.findOneByEmail(email);

        const userteam=await this.userteamService.showTeamUser(user.id);
        return userteam;
      }

      


      async deleteTeam({name}:DeleteTeamDto){ // delete one team and members in this
        const team=await this.teamService.findOneByName(name);
        
        if (!team ) {
          // Handle errors, e.g., team or user not found
          throw new NotFoundException('Team  not found');
        }
        await this.teamService.deleteByName(name);
        await this.userteamService.removeAllUsersFromTeam(team.id);
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

      return true;
    
      
      
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
  
  
  
  