import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import type { Hono } from "hono";
import { Database } from "bun:sqlite";
import type { UserModuleSetupType } from "./users.types";

export class UsersModule {
  private readonly controller: UsersController;
  private readonly repository: UsersRepository;

  constructor(database: Database) {
    this.repository = new UsersRepository(database);
    this.controller = new UsersController(this.repository);
  }

  public init(): UserModuleSetupType {
    this.repository.init();

    return this.controller.routes();
  }
}
