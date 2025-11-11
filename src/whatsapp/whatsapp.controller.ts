import type { Request, Response } from "express";
import { whatsappService } from "./whatsapp.service";
import { Trace } from "../tracing";

export class WhatsappController {
  @Trace({spanName: "whatsappController.create"})
  async create(req: Request, res: Response) {
    const created = await whatsappService.create(req.body);
    res.json(created);
  }

  @Trace({spanName: "whatsappController.connect"})
  async connect(req: Request, res: Response) {
    const response = await whatsappService.connect(req.params.phone_id);
    res.json(response);
  }

  @Trace({spanName: "whatsappController.disconnect"})
  async disconnect(req: Request, res: Response) {
    const response = await whatsappService.disconnect(req.params.phone_id);
    res.json(response);
  }
}

export const whatsappController = new WhatsappController();
