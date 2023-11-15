import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

import { AuthModule } from './auth/auth.module';
import * as express from 'express';
import { TeamsModule } from './users/teams.module';
import { UserTeamsModule } from './users/userTeam.module';



@Module({
  imports: [
    UsersModule,
    TeamsModule,
    UserTeamsModule,
  
    
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        express.json(),
        express.urlencoded({ extended: true }),
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    // Configuración de CORS
    consumer
      .apply((_req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:19006') ;
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
