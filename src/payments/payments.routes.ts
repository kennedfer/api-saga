import { Router, type Router as ExpressRouter } from "express";
import { paymentController } from "./payments.controller";
import { validateSchema } from "../middlewares";
import { createPaymentHistorySchema } from "../../domain/payments_history/create-payment.schema";

const paymentsRoutes: ExpressRouter = Router();
// validateSchema({ body: createUserSchema })
paymentsRoutes.post(
  "/webhook",
  // validateSchema({ body: createPaymentHistorySchema }),
  paymentController.processWebhook.bind(paymentController)
);

export { paymentsRoutes };
