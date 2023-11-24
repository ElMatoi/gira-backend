import { User } from "src/users/entities/user.entity";
import { Teamproject } from "src/projects/entities/teamproject.entity";

export class CreateTaskDto {
  name:string;
  user:User;
  userCharge:User;
  teamproject:Teamproject;
  description: string;
  startDate: string; 
  endDate: string;   
    
  }