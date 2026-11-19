import type { Hono } from "hono";
import { CommentsController } from "./comments.controller";
import { CommentsRepository } from "./comments.repository";
import { Database } from "bun:sqlite";

export class CommentsModule {
  private readonly repository: CommentsRepository;
  private readonly controller: CommentsController;

  constructor(database: Database) {
    this.repository = new CommentsRepository(database);
    this.controller = new Comments
    Controller(this.repository);
  }

  public init(): Hono {
    this.repository.init();

    return this.controller.routes();
  }
}