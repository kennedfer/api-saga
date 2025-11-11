import { Router, type Router as ExpressRouter } from "express";
import { whatsappController, WhatsappController } from "./whatsapp.controller";
import { validateSchema } from "../middlewares";
import { createPhoneSchema } from "../../domain/phone/create-phone.schema";
import { phoneParamScheme } from "../../domain/phone/phone-param.schema";

const whatsappRoutes: ExpressRouter = Router();

whatsappRoutes.post(
  "/create",validateSchema({body: createPhoneSchema}),
  whatsappController.create.bind(whatsappController)
);

whatsappRoutes.get(
  "/connect/:phone_id", validateSchema({params: phoneParamScheme}),
  whatsappController.connect.bind(whatsappController)
);

whatsappRoutes.delete(
  "/disconnect/:phone_id", validateSchema({params: phoneParamScheme}),
  whatsappController.disconnect.bind(whatsappController)
);

export { whatsappRoutes };
