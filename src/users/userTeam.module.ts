import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserTeam } from './entities/userTeam.entity';
import { UserTeamController } from './userteam.controller';
import { UseTeamService } from './userteam.services';


@Module({
  imports: [TypeOrmModule.forFeature([UserTeam])],
  controllers: [UserTeamController],
  providers: [UseTeamService],
  exports: [UseTeamService],
})
export class UserTeamsModule {}