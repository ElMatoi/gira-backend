import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controllers';
import { Teamproject } from './entities/teamproject.entity';
import { ProjectTeamService } from './teamproject.services';
import { ProjectService } from './projects.service';
@Module({
  imports: [TypeOrmModule.forFeature([Project,Teamproject])],
  controllers: [ProjectsController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectsModule {}
