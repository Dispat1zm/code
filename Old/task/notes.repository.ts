import { NoteItem } from "./notes.types";

export class NotesRepository {
    private readonly notes: NoteItem[] = [];

    constructor() {
        this.create("Hello world");
        this.create("Goodbye");
    }

    public fildAll(): NoteItem[] {
        return this.notes;
    }

    public finById(id:number): NoteItem | undefined {
        return this.notes.find(note => note.id === id);
    }

    public create(content: string): NoteItem {
        const nextId: number = Math.max(...this.notes.map((note) => note.id), 0) + 1;
        const item = {
            id: nextId, content
        };
        this.notes.push(item);

        return item;
    }
}