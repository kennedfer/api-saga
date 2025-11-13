import { Router, type Router as ExpressRouter } from "express";
import { asaasWebhookController } from "./asaas-webhook.controller";

export const asaasWebhookRoutes: ExpressRouter = Router();

asaasWebhookRoutes.post(
  "/webhook/checkout",
  asaasWebhookController.processCheckout.bind(asaasWebhookController)
);

asaasWebhookRoutes.post(
  "/webhook/payment",
  asaasWebhookController.processPayment.bind(asaasWebhookController)
);
