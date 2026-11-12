import { ApplicationRepository } from "./application.repository";
import { BookType } from "./book.types.repository";

export class BookRepository {
    private readonly books: BookType[] = [];

    constructor(private readonly application: ApplicationRepository) {}

    public findAll(): BookType[] {
        return this.books;
    }
        
    public existsById(id: number): boolean {
        return this.books.some(element => element.id === id);
    }

    public create(title: string, authorId: number): BookType {
        const nextId = Math.max(...this.books.map((book) => book.id), 0) + 1;
        return {
            id: nextId,
            title,
            authorId,
        }
    }

    public save(book: BookType) {
        if (this.books.some((element) => element.id === book.id)) {
            console.log("Error");
            return;
        }

        this.books.push(book);
    }

    public deleteById(id: number) {
        const index = this.books.findIndex(element => element.id === id);

        if (index === -1) {
            console.log("eRror");
            return;
        }

        this.books.splice(index, 1);
    }

    public deleteAllByAuthorId(authorId: number) {
        this.books.filter(book => book.authorId === authorId)
        .forEach(book => this.deleteById(book.id));
    }
}

