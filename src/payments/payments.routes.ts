import { Router, type Router as ExpressRouter } from "express";
import { requireRole } from "../middlewares/auth";
import { paymentService } from "./payments.service";
import { paymentController } from "./payments.controller";

const userRoutes: ExpressRouter = Router();
// validateSchema({ body: createUserSchema })
userRoutes.post(
  "/webhook/api",
  requireRole("User"),
  paymentService.processWebhook.bind(paymentController)
);

export { userRoutes };
