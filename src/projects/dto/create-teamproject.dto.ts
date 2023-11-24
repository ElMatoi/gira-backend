import { UserTeam } from "src/users/entities/userTeam.entity";
import { Project } from "../entities/project.entity";

export class CreateTeamProjectDto {

    userTeam: UserTeam;
    project: Project;
    description: string;
    startDate: string; 
    endDate: string;   
    
    
}
