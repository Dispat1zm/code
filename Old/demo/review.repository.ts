import { ApplicationRepository } from "./application.repository";
import { ReviewItem } from "./review.types.repository";

const application = new ApplicationRepository();

export class ReviewRepository {
    private readonly reviews: ReviewItem[] = [];

    constructor(private readonly application: ApplicationRepository) {}

    public findAll(): ReviewItem[] {
        return this.reviews;
    }

    public existsById(id: number): boolean {
        return this.reviews.some(element => element.id === id);
    }

    public create(userId: number, bookId: number, content: string): ReviewItem {
        const nextId = Math.max(...this.reviews.map((review) => review.id), 0) + 1;
        return {
            id: nextId,
            userId,
            bookId,
            content,
        }
    }

    public save(review: ReviewItem) {
        if (this.reviews.some((element) => element.id === review.id)) {
            console.log("Error");
            return;
        }

        if ((application.users.existsById(review.userId) == true) && (application.books.existsById(review.bookId) == true) && (review.userId != review.bookId)) {
            this.reviews.push(review);
        } else {
            console.log("eRror");
            return;
        }
    }

    public deleteById(id: number) {
        const index = this.reviews.findIndex(element => element.id === id);

        if (index === -1) {
            console.log("eRror");
            return;
        }

        this.reviews.splice(index, 1);
    }
}