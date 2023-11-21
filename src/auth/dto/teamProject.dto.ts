import { IsEmail, IsString, IsDate, IsOptional } from "class-validator";

export class TeamProjectDto {
 
  @IsEmail()
  email: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
