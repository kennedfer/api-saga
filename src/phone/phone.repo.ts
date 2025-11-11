import { NewPhone } from "../../domain/phone/phone.table";
import { db } from "../db";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors";
import { Trace } from "../tracing";

export class PhoneRepo {
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
        throw new BadRequestError("Phone already exists", { cause: error });
      }
      throw new InternalServerError("Failed to create phone", { cause: error });
    }
  }

  @Trace({ spanName: "phoneRepo.deletePhone" })
  async deletePhone(id: string): Promise<void> {
    try {
      const deleted = await db
        .deleteFrom("phones")
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirst();
      if (!deleted) {
        throw new NotFoundError("Phone");
      }
    } catch (error: any) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError("Failed to delete phone", { cause: error });
    }
  }
}

export const phoneRepo = new PhoneRepo();
