import {IsString} from "class-validator";

export class SaveNoteDto {
    @IsString()
    text: string;
}
