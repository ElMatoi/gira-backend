import { IsEmail, IsString, IsDate, IsOptional,Validate } from "class-validator";

function isValidDateFormat(value: string): boolean {
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  return dateRegex.test(value);
}

export class TeamProjectDto {
 
  @IsEmail()
  emailUser: string;
  @IsString()
  nameTeam:string;
  @IsString()
  nameProject:string;

  @IsString()
  description: string;

  
  @IsString()
  @Validate(isValidDateFormat, {
    message: 'Invalid date format. Use dd-mm-yyyy.',
  })
  startDate: string;

  @IsString()
  @Validate(isValidDateFormat, {
    message: 'Invalid date format. Use dd-mm-yyyy.',
  })
  endDate: string;
}
