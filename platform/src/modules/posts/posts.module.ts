import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";
import { Database } from "bun:sqlite";

export class PostsModule {
  private readonly repository: PostsRepository;
  private readonly controller: PostsController;

  constructor(database: Database) {
    this.repository = new PostsRepository(database);
    this.controller = new PostsController(this.repository);
  }

  public init(): Hono {
    this.repository.init();

    return this.controller.routes();
  }
}