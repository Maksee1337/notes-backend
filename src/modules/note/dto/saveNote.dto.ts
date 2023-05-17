import {IsString} from "class-validator";

export class SaveNoteDto {
    @IsString()
    encryptedText: string;
}
