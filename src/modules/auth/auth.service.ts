import {ConflictException, Injectable, UnauthorizedException} from '@nestjs/common';
import * as process from "process";
import * as bcrypt from 'bcrypt';
import {SignupDto} from "./dto/signup.dto";
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login.dto";
import {IUser} from "../../interfaces/IUser";
import {JwtService} from "./jwt.service";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
    ) {
    }

    public async signup(signupDto: SignupDto) {
        const {email, password} = signupDto;
        let user: IUser = await this.userService.getUserByEmail(email);
        if (user) {
            throw new ConflictException('Email already taken');
        }

        signupDto.password = await bcrypt.hash(signupDto.password, +process.env.PW_ROUNDS)
        user = await this.userService.createUser(signupDto);
        return this.updateTokens(user)
    }

    public async login(loginDto: LoginDto) {
        let user: IUser = await this.userService.getUserByEmail(loginDto.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        return this.updateTokens(user)
    }

    public async refreshToken(token: string) {
        let user: IUser = await this.userService.getUserByRefreshToken(token);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.updateTokens(user)
    }

    private async updateTokens(user: IUser) {
        const tokens = await this.jwtService.getTokens(user)
        await this.userService.updateUser({...user, refreshToken: tokens.refreshToken})
        return tokens
    }
}
