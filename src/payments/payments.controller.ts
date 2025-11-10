import type { Request, Response } from "express";
import { paymentService } from "./payments.service";

export class PaymentController {
  async proccessWebhook(req: Request, res: Response) {
    const processed = await paymentService.processWebhook(req.body);
    res.status(201).json(processed);
  }
}

export const paymentController = new PaymentController();
