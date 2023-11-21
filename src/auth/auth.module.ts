import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import {TeamsModule} from "src/users/teams.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./jwt.constant";
import { JwtModule } from "@nestjs/jwt";
import { UserTeamsModule } from "src/users/userTeam.module";
import { ProjectsModule } from "src/projects/projects.module";
import { TeamProjectModule } from "src/projects/teamproject.module";

@Module({
  imports: [
    UsersModule,
    TeamsModule,
    UserTeamsModule,
    ProjectsModule,
    TeamProjectModule,
    
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

