import { NewPhone } from "../../domain/phone/phone.table";
import type { NewUserPlan } from "../../domain/user-plan/user-plan.table";
import { db } from "../db";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors";
import { Trace } from "../tracing";

export class UserPlanRepo {
  @Trace({ spanName: "userPlanRepo.insertPlan" })
  async insertPlan(input: NewUserPlan): Promise<string> {
    try {
      const row = await db
        .insertInto("user_plans")
        .values(input)
        .returningAll()
        .executeTakeFirst();
      if (!row) {
        throw new InternalServerError("Failed to create user-plan");
      }
      return row.id;
    } catch (error: any) {
      if (error.code === "23505") {
        // PostgreSQL unique violation
        throw new BadRequestError("user-plan already exists", { cause: error });
      }
      throw new InternalServerError("Failed to create user-plan", {
        cause: error,
      });
    }
  }
}

export const userPlanRepo = new UserPlanRepo();
