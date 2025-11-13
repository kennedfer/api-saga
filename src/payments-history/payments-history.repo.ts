import { NewPaymentHistory } from "../../domain/payments_history/payments-history.table";
import { db } from "../db";
import { BadRequestError, InternalServerError } from "../errors";
import { Trace } from "../tracing";

export class PaymentsHistoryRepo {
  @Trace({ spanName: "paymentsHistoryRepo.insertPayment" })
  async insertPayment(input: NewPaymentHistory): Promise<string> {
    try {
      const row = await db
        .insertInto("payments_history")
        .values(input)
        .returningAll()
        .executeTakeFirst();
      if (!row) {
        throw new InternalServerError("Failed to create payment in history");
      }
      return row.id;
    } catch (error: any) {
      if (error.code === "23505") {
        // PostgreSQL unique violation
        throw new BadRequestError("Payment already exists in history", {
          cause: error,
        });
      }
      throw new InternalServerError("Failed to create payment in history", {
        cause: error,
      });
    }
  }
}

export const paymentsHistoryRepo = new PaymentsHistoryRepo();
