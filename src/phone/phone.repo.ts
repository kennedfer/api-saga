import { NewPhone } from "../../domain/phone/phone.table";
import { db } from "../db";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors";
import { Trace } from "../tracing";

export class PhoneRepo {
  async getPhone(id: string) {
    return {
      id: "88da9da-d9a0-da90da-da09",
      phone_number: "5598970204218",
      user_id: "819dada-1298djkda-128931-sada"
    };

    try {
      const phone = await db
        .selectFrom("phones")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();
      if (!phone) {
        // Só para testes
        // throw new NotFoundError("phone");

        return {
          id: "",
          phone_number: "5598970204218",
          user_id: "sla"
        };
      }
      return phone;
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError("Failed to get phone", { cause: error });
    }
  }
  @Trace({ spanName: "phoneRepo.insertPhone" })
  async insertPhone(input: NewPhone): Promise<string> {
    try {
      const row = await db
        .insertInto("phones")
        .values(input)
        .returningAll()
        .executeTakeFirst();
      if (!row) {
        throw new InternalServerError("Failed to create phone");
      }
      return row.id;
    } catch (error: any) {
      if (error.code === "23505") {
        // PostgreSQL unique violation
        throw new BadRequestError("Email already exists", { cause: error });
      }
      throw new InternalServerError("Failed to create phone", { cause: error });
    }
  }
}

export const phoneRepo = new PhoneRepo();
