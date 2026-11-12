import { NotesRepository } from "./notes.repository";

const notesRepo = new NotesRepository();

export class RootRepository {
    private readonly notes: NotesRepository = new NotesRepository();

    public start() {
        const server = Bun.serve({
            port: 3000,
            routes: {
                "/api/status/": () => Response.json({ massage: "OK" }),
                "/api/notes/": {
                    GET: () => Response.json({ data: notesRepo.fildAll()}),
                }
            } 
        });

        console.log(`SERVER STARTED: ${server.url}`);
    }
}