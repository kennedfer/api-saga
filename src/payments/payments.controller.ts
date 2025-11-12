import type { Request, Response } from "express";
import { paymentService } from "./payments.service";
import { TLSSocket } from "tls";
import { Trace } from "../tracing";

// const httpsOptions = {
//   cert: fs.readFileSync(""), // Certificado fullchain do dominio
//   key: fs.readFileSync("/"), // Chave privada do domínio
//   ca: fs.readFileSync(""), // Certificado público da Efí
//   minVersion: "TLSv1.2",
//   requestCert: true,
//   rejectUnauthorized: true, //Caso precise que os demais endpoints não rejeitem requisições sem mTLS, você pode alterar para false
// };

export class PaymentController {
  @Trace({ spanName: "paymentController.processWebhook" })
  async processWebhook(req: Request, res: Response) {
    const body = req.body;

    console.log(body);

    switch (body.event) {
      case "PAYMENT_CONFIRMED":
        const payment = body.payment;
        const response = await paymentService.processPayment(payment);

        console.log("resposta: " + JSON.stringify(response));
        return res.json(response);

      default:
        console.log("ai cali");
        return res.status(200).end();
    }
  }
}

export const paymentController = new PaymentController();
