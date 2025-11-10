import bcrypt from "bcrypt";
import type { NewUser, User, UserUpdate } from "../../domain/user/user.table";
import { BadRequestError, InternalServerError } from "../errors";
import { Trace } from "../tracing";

const SALT_ROUNDS = 10;

export class PaymentService {
  //   @Trace({ spanName: "userService.list" })
  //   async list(): Promise<User[]> {
  //     return await userRepo.listUsers();
  //   }

  //   @Trace({ spanName: "userService.get" })
  //   async get(id: string): Promise<User> {
  //     return await userRepo.getUser(id);
  //   }

  async processWebhook(body: any) {
    console.log("ai calica");
  }
}

export const paymentService = new PaymentService();
