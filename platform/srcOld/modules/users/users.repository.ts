import { Database } from "bun:sqlite";
import { type UserType, type UserUpdateType } from "./users.types";
import { number } from "zod";

export class UsersRepository {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  public init(): void {
    this.database.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        email TEXT NOT NULL,
        hash TEXT NOT NULL
      )
    `);
  }

  public existsByEmail(email: string): boolean {
    const prepared = email.trim().toLowerCase();

    const results = this.database
      .query<
        [number],
        [string]
      >("SELECT EXISTS(SELECT 1 FROM users where email = ?)")
      .values(prepared);

    return Boolean(results?.[0]?.[0] ?? false);
  }

  public findAll(): UserType[] {
    return this.database.query<UserType, []>("SELECT * FROM users").all();
  }

  public findById(id: number): UserType | null {
    return this.database
      .query<UserType, [number]>("SELECT * FROM users WHERE id = ?")
      .get(id);
  }

  public findByEmail(email: string): UserType | null {
    return this.database
      .query<UserType, [string]>("SELECT * FROM users WHERE email = ?")
      .get(email.toLowerCase().trim());
  }

  public create(title: string, email: string, hash: string): UserType | null {
    return this.database
      .query<
        UserType,
        string[]
      >("INSERT INTO users (title, email, hash) VALUES (?, ?, ?) RETURNING id, title, email")
      .get(title, email, hash);
  }
  
  public update(id: number, data: UserUpdateType): UserType | null {
    this.database
      .query<
        undefined,
        { $id: number; $title: string | null; $email: string | null }
      >(
        `
      UPDATE users
      SET
        title = COALESCE($title, title),
        email = COALESCE($email, email)
      WHERE id = $id
    `,
      )
      .run({
        $id: id,
        $title: data.title ?? null,
        $email: data.email ?? null,
      });

    return this.findById(id);
  }

  public deleteById(id: number): void {
    this.database
      .query<undefined, [number]>("DELETE FROM users WHERE id = ?")
      .run(id);
  }
}
