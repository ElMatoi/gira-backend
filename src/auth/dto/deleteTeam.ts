
import { IsString } from "class-validator";

export class DeleteTeamDto {
  

  @IsString()
 
  name: string;
}
