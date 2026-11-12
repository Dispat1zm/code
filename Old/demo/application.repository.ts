import { BookRepository } from "./book.repository";
import { UserRepository } from "./user.repository";
import { ReviewRepository } from "./review.repository";

export class ApplicationRepository {
    public readonly users: UserRepository;
    public readonly books : BookRepository;
    public readonly reviews: ReviewRepository;

    constructor() {
        this.users = new UserRepository(this);
        this.books = new BookRepository(this);
        this.reviews = new ReviewRepository(this);
    }
}