import type { Request, Response } from "express";
import { Trace } from "../tracing";
import { asaasWebhookService } from "./asaas-webhook.service";

export class AsaasWebhookController {
  @Trace({ spanName: "AsaasWebhookController.processCheckout" })
  async processCheckout(req: Request, res: Response) {
    const body = req.body;

    try {
      switch (body.event) {
        case "CHECKOUT_PAID":
          await asaasWebhookService.processCheckout(body.checkout);
          break;

        default:
          console.log("Evento de checkout não tratado:", body.event);
          break;
      }

      res.status(200).end();
    } catch (error) {
      console.error("Erro ao processar webhook de checkout:", error);
      res.status(500).end();
    }
  }

  @Trace({ spanName: "AsaasWebhookController.processPayment" })
  async processPayment(req: Request, res: Response) {
    const body = req.body;

    try {
      switch (body.event) {
        case "PAYMENT_RECEIVED":
          await asaasWebhookService.processPayment(body);
          break;

        default:
          console.log("Evento de pagamento não tratado:", body.event);
          break;
      }

      res.status(200).end();
    } catch (error) {
      console.error("Erro ao processar webhook de pagamento:", error);
      res.status(500).end();
    }
  }
}

export const asaasWebhookController = new AsaasWebhookController();
