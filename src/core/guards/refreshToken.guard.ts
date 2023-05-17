import {CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import * as jwt from 'jsonwebtoken';
import * as process from "process";

export class RefreshTokenGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.body.token;
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            request['user'] = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
        } catch (e) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
