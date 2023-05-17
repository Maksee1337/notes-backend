import {IsEmail, IsStrongPassword} from "class-validator";
import {IUser} from "../../../interfaces/IUser";

export class SignupDto implements IUser{
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    confirmPassword: string;

    refreshToken: string;
}
