import { z } from "zod";

export const updateUserSchema = z.object({
    tenant_id: z.string().nullable().optional(),
    email: z.email().optional(),// z.string().email() is deprecated
    // bcrypt uses only the first 71 chars; the rest are ignored
    password: z.string().min(1).max(70).optional(),
    cpf: z.string().min(11).max(14).optional(), //LEMBRAR DE CONVERTER UM CPF FORMATADO PARA UM NAO FORMATADO ANTES DE SALVAR NO DB
    role: z.enum(["User"]).optional(),
  }).refine((obj) => Object.keys(obj).length > 0, { message: "At least one field required" });