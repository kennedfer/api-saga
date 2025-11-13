import { NewPhone } from "../../domain/phone/phone.table";
import { BadRequestError, NotFoundError } from "../errors";
import { phoneRepo } from "../phone/phone.repo";
import { Trace } from "../tracing";
import { evolutionApi } from "../utils/axios";

class WhatsappService {
  @Trace({ spanName: "whatsappService.create" })
  async create(input: NewPhone) {
    try {
      //Can await the id from evolution to save 
      //Can save with userId to future searchs
      const phoneId = await phoneRepo.insertPhone(input);

      const { data } = await evolutionApi.post("/instance/create", {
        instanceName: phoneId,
        number: input.phone_number,
        integration: "WHATSAPP-BAILEYS",
        qrcode: true,
      });

      return {
        instance: data.instance,
        qrcode: data.qrcode,
      };
    } catch (error: any) {
      if (error.name === "ZodError") {
        throw new BadRequestError("Validation error", { cause: error });
      }
      if (error.code === "23505") {
        throw new BadRequestError("Phone already exists", { cause: error });
      }
      throw error;
    }
  }

  @Trace({ spanName: "whatsappService.connect" })
  async connect(phoneId: string) {
    try {
      const { data } = await evolutionApi.get(`/instance/connect/${phoneId}`);
      return data;
    } catch (error: any) {
      if (error.status === 404) {
        throw new NotFoundError("Whatsapp instance");
      }

      throw error;
    }
  }

  @Trace({ spanName: "whatsappService.disconnect" })
  async disconnect(phoneId: string) {
    try {
      const { data } = await evolutionApi.delete(`/instance/delete/${phoneId}`);

      if (!data?.error) {
        await phoneRepo.deletePhone(phoneId);
      }

      console.log(data);
      return data;
    } catch (error: any) {
      if (error.status === 404) {
        throw new NotFoundError("Whatsapp instance");
      }

      throw error;
    }
  }
}

export const whatsappService = new WhatsappService();
