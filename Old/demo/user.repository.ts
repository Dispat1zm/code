import { ApplicationRepository } from "./application.repository";
import { UserItem } from "./user.types.repository";

const appl = new ApplicationRepository();

export class UserRepository {
    private readonly users: UserItem[] = [];

    constructor(private readonly application: ApplicationRepository) {}

    public findAll(): UserItem[] {
        return this.users;
    }

    public existsById(id: number): boolean {
        return this.users.some(element => element.id === id);
    }

    public create(title: string): UserItem {
        const nextId = Math.max(...this.users.map((user) => user.id), 0) + 1;
        return {
            id: nextId,
            title,
        }
    }

    public save(user: UserItem) {
        if (this.users.some((element) => element.id === user.id)) {
            console.log("Error");
            return;
        }

        this.users.push(user);
    }

    public deleteById(id: number) {
        const index = this.users.findIndex(element => element.id === id);

        if (index === -1) {
            console.log("eRror");
            return;
        }
        appl.books.deleteAllByAuthorId(id);
        this.users.splice(index, 1);
    }
}
