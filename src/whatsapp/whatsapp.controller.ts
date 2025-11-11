import type { Request, Response } from "express";
import { whatsappService } from "./whatsapp.service";

export class WhatsappController {
  async create(req: Request, res: Response) {
    const created = await whatsappService.create(req.body);
    res.json(created);
  }

  async connect(req: Request, res: Response) {
    const response = await whatsappService.connect(req.params.phone_id);
    res.json(response);
  }

  async disconnect(req: Request, res: Response) {
    const response = await whatsappService.disconnect(req.params.phone_id);
    res.json(response);
  }
}

export const whatsappController = new WhatsappController();
