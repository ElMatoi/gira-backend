import { User } from "src/users/entities/user.entity";
import {Team}from "src/users/entities/team.entity";

export class CreateUserTeamDto {
  user:User;
  team:Team;
  rol: string;
  }