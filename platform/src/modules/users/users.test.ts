import { afterEach, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { UsersModule } from "./users.module";
import { createTestClient } from "../../testing/test.client";
import type { ApplicationEnviroment } from "../application.types";
import z, { email, string } from "zod";
import { userSchema, userTokenSchema } from "./users.types";

const bindings = { JWT_SECRET: "test-jwt-secret" };

describe("Пользователи", () => {
    let database: Database;
    let app: Hono<ApplicationEnviroment>;
    let client: ReturnType<typeof createTestClient>;
    let token: string;
    let hash: string;

    beforeAll(async () => {
        hash = await Bun.password.hash("nke.ru");
    });


    beforeEach(async () => {
        database = new Database(":memory:");

        const { authRouter, usersRouter, validate } = new UsersModule(database).init();

        app = new Hono<ApplicationEnviroment>();
        app.use("*", validate);
        app.route("/api/auth", authRouter);
        app.route("/api/users", usersRouter);

        client = createTestClient(app, bindings);


        const insert = database.query(`
            INSERT INTO users (id, title, email, password) VALUES (?, ?, ?, ?)    
        `)

        insert.run(1, "Student One", "1@nke.ru", hash);
        insert.run(2, "Student Two", "2@nke.ru", hash);
        token = await sign({ sub: "1" }, bindings.JWT_SECRET, "HS256");
    });


    afterEach(() => database.close());

    describe.each(["/api/users", "/api/users/1"])("доступ к %s", (path) => {
        test("Без токена возвращает 401", async () => {
            const response = await client.get(path);

            expect(response.status).toBe(401)
            expect(await response.json()).toMatchObject({ success: false, error: "BAD AUTH" });
        });

        test("Некорректный тип токена возвращает 401", async () => {
            const response = await app.request(path, {
                headers: {
                    Authorizion: `Basic ${token}`,
                }
            }, bindings);

            expect(response.status).toBe(401);
            expect(await response.json()).toMatchObject({ success: false, error: "BAD AUTH" });
        });

        test("Некорректный токен возвращает 401", async () => {
            const response = await client.get(path, "invalid-token");

            expect(response.status).toBe(401);
            expect(await response.json()).toMatchObject({ success: false, error: "BAD AUTH" });
        });

        test("Поддельная подпись возвращает 401", async () => {
            const faketoken = await sign({sub: "1"}, "FakeSecret", "HS256");
            const response = await client.get(path, faketoken);

            expect(response.status).toBe(401);
        });

        test("Просроченный токен возвращает 401", async () => {
            const expiredToken = await sign({
                sub: "1",
                exp: Math.floor(Date.now() / 1000) - 60,
            }, bindings.JWT_SECRET);

            const response = await client.get(path, expiredToken);

            expect(response.status).toBe(401);
        });

        test("Токен удалeнного пользователя возвращает 401", async () => {
            database.run(`DELETE FROM users WHERE id = 1`);
            const response = await client.get(path, token);

            expect(response.status).toBe(401);
        });
    });
});

