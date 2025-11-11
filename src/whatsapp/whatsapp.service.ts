// apikey: "429683C4C977415CAAFCCE10F7D57E11

import { phoneRepo } from "../phone/phone.repo";

class WhatsappService {
  async connect(phoneId: string) {
    const response = await fetch(
      process.env.EVOLUTION_API_PATH + "/instance/connect/" + phoneId,
      {
        method: "get",
        headers: {
          apikey: "mude-me", // AUTHENTICATION_API_KEY
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as any;
    console.log(data);

    return data;
  }

  async disconnect(phoneId: string) {
    const response = await fetch(
      process.env.EVOLUTION_API_PATH + "/instance/delete/" + phoneId,
      {
        method: "DELETE",
        headers: {
          apikey: "mude-me", // AUTHENTICATION_API_KEY
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as any;

    if (!data.error) {
      phoneRepo.deletePhone(phoneId);
    }

    console.log(data);
    return data;
  }

  async create(instanceName: string, number: string) {
    const response = await fetch(
      process.env.EVOLUTION_API_PATH + "/instance/create",
      {
        method: "post",
        headers: {
          apikey: "mude-me", // AUTHENTICATION_API_KEY
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instanceName, // nome único da instância (acho que devo juntar de algum modo com o userId para pessoas diferentes terem instancias com mesmo nome)
          number,
          integration: "WHATSAPP-BAILEYS",
          qrcode: true,
        }),
      }
    );

    const data = (await response.json()) as any;

    console.log(data);

    return {
      instance: data.instance,
      qrcode: data.qrcode,
    };
  }
}

export const whatsappService = new WhatsappService();
