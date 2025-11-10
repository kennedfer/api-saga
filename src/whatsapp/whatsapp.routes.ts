import { Router, type Router as ExpressRouter } from "express";
import { whatsappController, WhatsappController } from "./whatsapp.controller";

const whatsappRoutes: ExpressRouter = Router();

//Por o "/Whatsapp" no prefix
whatsappRoutes.post(
  "/create/:phone_id",
  whatsappController.create.bind(whatsappController)
);

export { whatsappRoutes };
