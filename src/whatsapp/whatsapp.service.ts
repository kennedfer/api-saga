// apikey: "429683C4C977415CAAFCCE10F7D57E11

class WhatsappService {
  async connectWhatsapp(instanceName: string, number: string) {
    const response = await fetch("http:localhost:8080/instance/create", {
      method: "post",
      headers: {
        apikey: "429683C4C977415CAAFCCE10F7D57E11", // AUTHENTICATION_API_KEY
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instanceName, // nome único da instância (acho que devo juntar de algum modo com o userId para pessoas diferentes terem instancias com mesmo nome)
        number,
        integration: "WHATSAPP-BAILEYS",
        qrcode: true,
      }),
    });

    const data = await response.json() as any;

    return {
        instance: data.instance,
        qrcode: data.qrcode.base64,
    }
  }
}

export const whatsappService = new WhatsappService();