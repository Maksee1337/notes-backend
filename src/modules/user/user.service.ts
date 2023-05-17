import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {IUser} from "../../interfaces/IUser";

@Injectable()
export class UserService {
    constructor(  @InjectRepository(User) private userRepository: Repository<User>,) {
    }

    public async getUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email}})
    }
    public async getUserByRefreshToken(refreshToken: string) {
        return this.userRepository.findOne({where: {refreshToken}})
    }
    public async createUser(user: IUser) {
        return this.userRepository.save(user);
    }
    public async updateUser(user: IUser) {
        return this.userRepository.save(user);
    }
}
