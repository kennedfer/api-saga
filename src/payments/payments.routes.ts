import { Router, type Router as ExpressRouter } from "express";
import { paymentController } from "./payments.controller";

const paymentsRoutes: ExpressRouter = Router();
// validateSchema({ body: createUserSchema })
paymentsRoutes.post(
  "/webhook/pix",
  paymentController.processWebhook.bind(paymentController)
);


export { paymentsRoutes };
