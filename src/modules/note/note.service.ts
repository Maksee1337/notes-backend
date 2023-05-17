import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Note} from "../../entities/note.entity";
import {Repository} from "typeorm";
import {SaveNoteDto} from "./dto/saveNote.dto";

@Injectable()
export class NoteService {
    constructor(@InjectRepository(Note) private readonly noteRepository: Repository<Note>) {
    }

    public async saveNote(saveNoteDto: SaveNoteDto) {
        const {id} = await this.noteRepository.save(saveNoteDto)
        return {id};
    }

    public async getNoteById(id: string) {
            const regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$');
            if(!regex.test(id)) throw new NotFoundException('Note not found');
            const note = await this.noteRepository.findOne({where: {id}, select: ['encryptedText']});
            if(!note) throw new NotFoundException('Note not found');
            return note;
    }
}
