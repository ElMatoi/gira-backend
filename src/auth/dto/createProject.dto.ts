import {  IsString,IsEmail } from "class-validator";

export class CreateProjectDto {
 
  @IsEmail()
  email:string;
  @IsString()
  name: string;
}
