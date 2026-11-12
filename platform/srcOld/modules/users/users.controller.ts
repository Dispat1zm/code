import type { BunRequest, Serve } from "bun";
import type { UsersRepository } from "./users.repository";
import { Context, Hono, type Next, type TypedResponse } from "hono";
import type {
  ApplicationEnviroment,
  ApplicationResult,
  IDParamType,
} from "../application.types";
import {
  userCreateSchema,
  type UserCreateType,
  type UserModuleSetupType,
  type UserType,
  type UserUpdateType,
} from "./users.types";
import { zValidator } from "@hono/zod-validator";

export class UsersController {
  private readonly repository: UsersRepository;

  constructor(repository: UsersRepository) {
    this.repository = repository;
  }

  public routes(): UserModuleSetupType {
    return {
      usersRouter: new Hono()
        .get("/", this.findAll.bind(this))
        .get("/:id", this.findOne.bind(this))
        .patch("/:id", this.updateById.bind(this))
        .delete("/:id", this.deleteById.bind(this)),

      authRouter: new Hono()
        .post("/register/", zValidator('json', userCreateSchema), this.register.bind(this))
        .post("/login/", this.auth.bind(this)),

      authMiddleware: this.token.bind(this),
    };
  }

  public async register(
    c: Context<ApplicationEnviroment, "/", { out: { json: UserCreateType } }>,
  ): Promise<TypedResponse<ApplicationResult<UserType>>> {
    const body = c.req.valid("json");

    const hash = await Bun.password.hash(body.password);
    const user = this.repository.create(body.title, body.email, hash);

    if (!user) {
      return c.json({ success: false, error: "Internal server error" }, 500);
    }

    return c.json({ success: true, data: user });
  }

  public async auth(c: Context): Promise<void> {}

  public async token(c: Context, next: Next): Promise<void> {}

  public async findAll(
    c: Context,
  ): Promise<TypedResponse<ApplicationResult<UserType[]>>> {
    return c.json({ success: true, data: this.repository.findAll() });
  }

  public async findOne(
    c: Context<ApplicationEnviroment, "/:id", { out: { param: IDParamType } }>,
  ): Promise<TypedResponse<ApplicationResult<UserType>>> {
    const { id } = c.req.valid("param");
    const user = this.repository.findById(id);

    if (!user) {
      return c.json({ success: false, error: "User not found" }, 404);
    }

    return c.json({ success: true, data: user });
  }

  public async updateById(
    c: Context<
      ApplicationEnviroment,
      "/:id",
      { out: { param: IDParamType; json: UserUpdateType } }
    >,
  ): Promise<TypedResponse<ApplicationResult<UserType>>> {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    const user = this.repository.update(id, body);

    if (!user) {
      return c.json({ success: false, error: "Iternal server error" }, 500);
    }

    return c.json({ success: true, data: user });
  }

  public async deleteById(
    c: Context<ApplicationEnviroment, "/:id", { out: { param: IDParamType } }>,
  ): Promise<TypedResponse<ApplicationResult<UserType>>> {
    const { id } = c.req.valid("param");
    const user = this.repository.findById(id);

    if (!user) {
      return c.json({ success: false, error: "Iternal server error" }, 500);
    }

    this.repository.deleteById(id);

    return c.json({ success: true, data: user });
  }
}



    // public findAll(request: BunRequest<"/api/users/">): Response {
    //     return Response.json({data: this.repository.findAll()});
    // }

    // public findById(request: BunRequest<"/api/users/:id">): Response {
    //     const id: number = Number(request.params.id);
        
    //     if (isNaN(id) || id < 1) {
    //         return Response.json(
    //             {error: "Error"},
    //             {status: 400}
    //         );
    //     }

    //     const user = this.repository.findById(id);

    //     if (!user) {
    //         return Response.json(
    //             {error: "User not found"},
    //             {status: 404}
    //         );
    //     }

    //     return Response.json({data: this.repository.findById(id)});
    // }

    // public async create(request: BunRequest<"/api/users/">): Promise<Response> {
        
    //     try {
    //         const body: any = await request.json();

    //         if (!body?.title || !body?.email ) {
    //             return Response.json(
    //                 { error: "BED REQUEST"}, 
    //                 { status: 400}
    //             );   
    //         }

    //         const user = this.repository.create(body.title, body.email);

    //         if (!user) {
    //             return Response.json(
    //                 { error: "INTERNAL SERVER ERROR" },
    //                 { status: 400 }
    //             );
    //         }

    //         return Response.json({ data: user});
    //     } catch {
    //         return Response.json(
    //             {error: "BED REQUEST"},
    //             {status: 400}
    //         );
    //     }
    // }

    // public async updateById(request: BunRequest<"/api/users/:id/">): Promise<Response> {
    //     try {
    //         const id: number = Number(request.params.id);

    //         if (isNaN(id) || id < 1) {
    //             return Response.json(
    //                 {error: "Error"},
    //                 {status: 400}
    //             )
    //         }

    //         const body: any = await request.json();

    //         if (!body?.title && !body?.email) {
    //             return Response.json(
    //                 {error: "BAT REQUEST"},
    //                 {status: 400}
    //             );
    //         }

    //         const user = this.repository.update(id, {
    //             title: body.title ?? null,
    //             email: body.email ?? null
    //         });

    //         return Response.json({data: user});
    //     } catch {
    //         return Response.json(
    //             {error: "INTERNAL SERVER ERROR"},
    //             {status: 500}
    //         );
    //     }
    // }