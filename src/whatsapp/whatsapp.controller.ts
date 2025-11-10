import type { Request, Response } from "express";
import { phoneRepo } from "../phone/phone.repo";
import { whatsappService } from "./whatsapp.service";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export class WhatsappController {
  async connectNumber(req: Request, res: Response) {
    const phoneId = req.params["phone_id"];
    const instanceName = req.body["instance_name"];

    try {
      const phoneNumber = (await phoneRepo.getPhone(phoneId))!.phone_number;

      const { qrcode } = await whatsappService.connectWhatsapp(
        instanceName,
        phoneNumber
      );

      // console.log(await response.text());
      res.send(qrcode);
    } catch (error) {
      console.error(error);
    }
  }

  //CREATE cadastraria um telefone com o userId e o numero
  async create(req: Request, res: Response) {
    const phone = req.params["phone_id"];

    // try {
    //   const response = await fetch("http:localhost:8080/instance/create", {
    //     method: "post",
    //     headers: {
    //       apikey: "429683C4C977415CAAFCCE10F7D57E11", // sua AUTHENTICATION_API_KEY
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       instanceName: "meu_telefone_5", // nome único da instância
    //       integration: "WHATSAPP-BAILEYS",
    //       number: "5598970204218",
    //       qrcode: true,
    //     }),
    //   });

    //   // console.log(await response.text());
    //   const data = await response.json();
    //   res.send(data);
    // } catch (error) {
    //   console.error(error);
    // }
  }
}

export const whatsappController = new WhatsappController();
