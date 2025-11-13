import { evolutionApi } from "./axios";

// curl --request POST \
//   --url https://{server-url}/message/sendText/{instance} \
//   --header 'Content-Type: application/json' \
//   --header 'apikey: <api-key>' \
//   --data '{
//   "number": "<string>",
//   "text": "<string>",
//   "delay": 123,
//   "linkPreview": true,
//   "mentionsEveryOne": true,
//   "mentioned": [
//     "{{remoteJID}}"
//   ],
//   "quoted": {
//     "key": {
//       "id": "<string>"
//     },
//     "message": {
//       "conversation": "<string>"
//     }
//   }
// }'

async function sendWhatsappMessage() {
  try {
    const response = await evolutionApi.post(
      "/message/sendText/03aeb3bc-8437-40e4-8e39-b1dda7069f05",
      {
        number: "5598970204218@c.us",
        text: "Oi estou testando a evolutionApi, se voce leu isso, deu certo :)",
      }
    );

    console.log("Mensagem enviada com sucesso:");
    console.log(response.data);
  } catch (error: any) {
    console.error("Erro ao enviar mensagem:", error.message);

    console.log(error.response?.data);
  }
}

sendWhatsappMessage();
