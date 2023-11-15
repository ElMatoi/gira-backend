import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Team } from './entities/team.entity';
import { UserTeam } from './entities/userTeam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Team,UserTeam])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
