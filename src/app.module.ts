import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as process from "process";
import {AuthModule} from "./modules/auth/auth.module";
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import {User} from "./entities/user.entity";
import {Note} from "./entities/note.entity";
import { NoteModule } from './modules/note/note.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.DB_URL,
            entities: [User, Note],
            synchronize: true,
            logging: true,
        }),
        AuthModule,
        UserModule,
        NoteModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
