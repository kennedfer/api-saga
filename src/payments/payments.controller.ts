import type { Request, Response } from "express";
import { paymentService } from "./payments.service";
import { Trace } from "../tracing";

export class PaymentController {
  @Trace({ spanName: "paymentController.processWebhook" })
  async processWebhook(req: Request, res: Response) {
    const body = req.body;

    switch (body.event) {
      case "PAYMENT_RECEIVED":
        console.log(body)
        await paymentService.processPayment(body);
        break;

      default:
        console.log("EVENTO NÃO TRATADO: "+body.event);
        console.log(body)
        break;
    }

    
    res.status(200).end();
  }
}

export const paymentController = new PaymentController();
