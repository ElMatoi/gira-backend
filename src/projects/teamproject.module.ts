import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teamproject } from './entities/teamproject.entity';
import { ProjectTeamService } from './teamproject.services';
import { TeamProjectController } from './teamproject.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Teamproject])],
  controllers: [TeamProjectController],
  providers: [ProjectTeamService],
  exports: [ProjectTeamService],
})
export class TeamProjectModule {}