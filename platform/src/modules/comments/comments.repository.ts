import { Database } from "bun:sqlite";
import type { PostType } from "./comments.types";

export class CommentsRepository {
  constructor(private readonly database: Database) {
    
  }

  public init(): void {
    this.database.run(`
      CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        userId INTEGER NOT NULL,

        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
  }

  public findAll(): PostType[] {
    return this.database.query<PostType, []>("SELECT * FROM comments").all();
  }

  public findById(id: number): PostType | null {
    return this.database
      .query<PostType, [number]>("SELECT * FROM comments WHERE id = ?")
      .get(id);
  }

  public create(content: string, userId: number): PostType | null {
    return this.database
      .query<
        PostType,
        [string, number]
      >("INSERT INTO comments (content, userId) VALUES (?, ?) RETURNING id, content, userId")
      .get(content, userId);
  }
}