import { UserTeam } from "src/users/entities/userTeam.entity";
import { Project } from "../entities/project.entity";

export class CreateTeamProjectDto {
    
    description: string;
    startDate: Date; 
    endDate: Date;   
    userTeam: UserTeam;
    project: Project;
    
}
