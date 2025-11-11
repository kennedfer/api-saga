import type { Request, Response } from "express";
import { phoneRepo } from "../phone/phone.repo";
import { whatsappService } from "./whatsapp.service";
import { disconnect } from "process";

// - telefone
// - nome telefone

export class WhatsappController {
  async create(req: Request, res: Response) {
    try {
      const phoneId = await phoneRepo.insertPhone(req.body);
      const response = await whatsappService.create(phoneId, req.body.phone);

      res.send(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async connect(req: Request, res: Response) {
    const phoneId = req.params["phone_id"];

    try {
      const response = await whatsappService.connect(phoneId);

      // console.log(await response.text());
      res.send(response);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }

  async disconnect(req: Request, res: Response) {
    const phoneId = req.params["phone_id"];

    try {
      const response = await whatsappService.disconnect(phoneId);

      // console.log(await response.text());
      res.send(response);
    } catch (error) {
      console.error(error);
      res.json(error);
    }
  }
}

export const whatsappController = new WhatsappController();
