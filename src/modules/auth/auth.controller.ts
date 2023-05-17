import {Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {SignupDto} from "./dto/signup.dto";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {RefreshTokenDto} from "./dto/refreshToken.dto";
import { Request as ExpressRequest } from 'express';
import {UserAuthGuard} from "../../core/guards/userAuth.guard";
import {RefreshTokenGuard} from "../../core/guards/refreshToken.guard";
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @Post('signup')
    public signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto)
    }

    @Post('login')
    public login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refreshToken')
    public refreshToken(@Body() {refreshToken}: RefreshTokenDto) {
        return this.authService.refreshToken(refreshToken)
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(UserAuthGuard)
    @Get('test')
    public authTest(@Request() req: ExpressRequest | any) {
        return {res: req.user}
    }
}
