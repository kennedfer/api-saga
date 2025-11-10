import type { Request, Response } from "express";
import { da } from "zod/v4/locales";

export class WhatsappController {
  async create(req: Request, res: Response) {
    const phone = req.params["phone_id"];

    try {
      const response = await fetch(
        "http://localhost:8080/instance/connect/meu_telefone_2",
        {
          method: "get",
          headers: {
            apikey: "mude-me", // sua AUTHENTICATION_API_KEY
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   instanceName: "meu_telefone_2", // nome único da instância
          //   integration: "WHATSAPP-BAILEYS",
          //   number: "5598985082414",
          //   qrcode: true,
          // }),
        }
      );

      const data = await response.json();
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error(error);
    }
  }
}

export const whatsappController = new WhatsappController();
