import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {NoteService} from "./note.service";
import {SaveNoteDto} from "./dto/saveNote.dto";
@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {
    }

    @Post('')
    public async saveNote(@Body() saveNoteDto: SaveNoteDto) {
        return this.noteService.saveNote(saveNoteDto)
    }

    @Get(':id')
    public async getNote(@Param('id') id: string) {
        return this.noteService.getNoteById(id);
    }
}

