import {Injectable} from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import {IUser} from "../../interfaces/IUser";
import * as process from "process";

@Injectable()
export class JwtService {
    private getPayload = (user: IUser) => {
        return {
            ...user,
            refreshToken: undefined,
            password: undefined,
            exp: Math.floor(Date.now() / 1000) + (30)
        }
    }
    public async getTokens(user: IUser) {
        const payload = this.getPayload(user)
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET);
        const refreshToken = jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60)
            },
            process.env.JWT_REFRESH_TOKEN_SECRET
        );

        return {accessToken, refreshToken}
    }
}
