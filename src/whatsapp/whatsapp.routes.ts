import { Router, type Router as ExpressRouter } from "express";
import { whatsappController, WhatsappController } from "./whatsapp.controller";

const whatsappRoutes: ExpressRouter = Router();

//Por o "/Whatsapp" no prefix
whatsappRoutes.post(
  "/create",
  whatsappController.create.bind(whatsappController)
);

whatsappRoutes.get(
  "/connect/:phone_id",
  whatsappController.connect.bind(whatsappController)
);

whatsappRoutes.delete(
  "/disconnect/:phone_id",
  whatsappController.disconnect.bind(whatsappController)
);

export { whatsappRoutes };
