import { IsEmail, IsString } from "class-validator";

export class UpdateTeamUserDto {
 
  @IsEmail()
  email:string;
  @IsString()
  name: string;
  @IsString()
  rol:string;
}
