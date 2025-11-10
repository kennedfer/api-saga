import { Router, type Router as ExpressRouter } from "express";
import { whatsappController, WhatsappController } from "./whatsapp.controller";

const whatsappRoutes: ExpressRouter = Router();

//Por o "/Whatsapp" no prefix
whatsappRoutes.get(
  "/create/:phone_id",
  whatsappController.create.bind(whatsappController)
);

whatsappRoutes.post(
  "/connect/:phone_id",
  whatsappController.connectNumber.bind(whatsappController)
);

export { whatsappRoutes };
