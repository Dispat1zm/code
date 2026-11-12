import z from "zod";

export type ApplicationEnviroment = {
    Variables: {};
};

export type ApplicationResult<T> = ApplicationSuccessResult<T> | ApplicationFailedResult;

export type ApplicationSuccessResult<T> = {
    success: true;
    data: T;
}

export type ApplicationFailedResult = {
    success: false;
    error: string;
}

export const IDParamSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID must be number")
    .transform(value =>  parseInt(value, 10)),
});

export type IDParamType = z.infer<typeof IDParamSchema>;