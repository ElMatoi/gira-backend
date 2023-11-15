import {Controller, Post,Body, Get, UseGuards, Request} from "@nestjs/common";
import {AuthService} from './auth.service';
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import {ResetPasswordDto} from "./dto/resetPassword.dto";
import { CreateTeamDto } from "./dto/createteam.dto";
import {UpdateTeamUserDto} from "./dto/updateteamuser.dto";
import {AuthGuard} from "./auth.guard";
import {DeleteTeamDto} from "./dto/deleteTeam";
import { Showteamuserdto } from "./dto/showteamuserdto";


@Controller('auth') 
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ){
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ){
        return this.authService.login(loginDto);
    }

    @Post('resetPassword')
    resetPassword(
        @Body()
        resetPasswordDto: ResetPasswordDto,
    ){
        return this.authService.resetPassword(resetPasswordDto);
    }
    @Post('createTeam')
    createTeam(
        @Body()
        createTeam: CreateTeamDto,
    ){
        return this.authService.createTeam(createTeam);
    }
    @Post('addUserToTeamByEmail')
    addUserToTeamByEmail(
        @Body()
        updateteamuserdto: UpdateTeamUserDto,
    ){
        return this.authService.addUserToTeamByEmail(updateteamuserdto);
    }
    @Post('showTeamsUser')
    showTeamUser(
        @Body()
        showteamuserdto: Showteamuserdto,

    ){
        return this.authService.showTeamUser(showteamuserdto);
    }
    @Post('deleteteam')
    DeleteTeamDto(
        @Body()
        deleteteam:DeleteTeamDto,
    ){
        return this.authService.deleteTeam(deleteteam);
    }

    @Get('dashboard')
    @UseGuards(AuthGuard)
    dashboard(
        @Request() req
    ) {
        return req.user;
    }
    
}
