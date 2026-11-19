import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import { Hono } from "hono";
import { UsersModule } from "./users.module";
import { createTestClient } from "../../testing/test.client";
import type { ApplicationEnviroment } from "../application.types";
import z, { email, string } from "zod";
import { userSchema, userTokenSchema } from "./users.types";

const bindings = { JWT_SECRET: "test-jwt-secret" };

const account = {
    title: "TEST-USER-01",
    email: "test-user-01@nke.ru",
    password: "12345678"
};

const tokenResponseSchema = z.object({
    success: z.literal(true),
    data: userTokenSchema
});

const userResponseSchema = z.object({
    success: z.literal(true),
    data: userSchema
});

describe("Авторизация", () => {
    let database: Database;
    let app: Hono<ApplicationEnviroment>;
    let client: ReturnType<typeof createTestClient>;

    beforeEach(() => {
        database = new Database(":memory:");

        const { authRouter, validate } = new UsersModule(database).init();

        app = new Hono<ApplicationEnviroment>();
        app.use("*", validate);
        app.route("/api/auth", authRouter);

        client = createTestClient(app, bindings);
    });

    afterEach(() => database.close());

    test("Регистрация возвращает код 200", async () => {
        const response = await client.post("/api/auth/register", account);

        expect(response.status).toBe(200);
        expect(await response.json()).toEqual({
            success: true,
            data: {
                token: expect.any(String),
            },
        });
    });

    test("Повторная регистрация возвращает 409", async () => {
        await client.post("/api/auth/register", account);
        const response = await client.post("/api/auth/register", account);

        expect(response.status).toBe(409);
    });

    test("Вход с правильными данными возвращает токен", async () => {
        await client.post("/api/auth/register", account);
        const response = await client.post("/api/auth/auth", {
            email: account.email,
            password: account.password
        });
        const result = tokenResponseSchema.parse(await response.json());

        expect(response.status).toBe(200);
        expect(result.data.token).toEqual(expect.any(String));

        const profile = await client.me(result.data.token);
        expect(profile.status).toBe(200);
        expect(await profile.json()).toMatchObject({
            success: true,
            data: {
                id: expect.any(Number),
                title: account.title,
                email: account.email
            }
        });
    });

    test("Неверный пароль возвращает 401", async() => {
        await client.post("/api/auth/register", account);
        const response = await client.post("/api/auth/auth", {
            email: account.email,
            password: "11111111"
        });

        expect(response.status).toBe(401);
        expect(await response.json()).toMatchObject({
            success: false,
        });
    });
    test("Без токена возвращает 401", async() => {
        const response = await client.me();

        expect(response.status).toBe(401);
    });
    test("Некорректный токен возвращает 401", async() => {
        const response = await client.me("adsd212313");

        expect(response.status).toBe(401);
    });
});