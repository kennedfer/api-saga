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
  @Trace({spanName: "paymentController.processWebhook"})
  async processWebhook(req: Request, res: Response) {
    const socket = req.socket as TLSSocket;
    // if (!socket.authorized) return res.sendStatus(401);

    try {
      await paymentService.processPayment(req.body);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  }
}

export const paymentController = new PaymentController();
