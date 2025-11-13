import { asaasApi } from "./axios";

async function createPixCheckout() {
  try {
    const response = await asaasApi.post("/checkouts", {
      billingTypes: ["PIX"],
      chargeTypes: ["DETACHED"],
      externalReference:
        "036ed8cb-31c8-484e-85a4-e43f1751f280_1610b448-26c4-445d-86c8-e700f477b6bd", //Só por enquanto, é "userId_planId"

      callback: {
        successUrl: "https://eighty-banks-sleep.loca.lt/success",
        cancelUrl: "https://eighty-banks-sleep.loca.lt/cancel",
        expiredUrl: "https://eighty-banks-sleep.loca.lt/expired",
      },

      items: [
        {
          externalReference: "1610b448-26c4-445d-86c8-e700f477b6bd",
          name: "Plano Standard",
          description: "Assinatura Standard (mensal)",
          quantity: 1,
          value: 10.0,
        },
      ],

      // identificar o cliente
      // customer: {
      //   name: "Fulano de Tal",
      //   email: "fulano@exemplo.com",
      //   ...
      // },
    });

    console.log("Checkout criado com sucesso:");
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.error(
      "Erro ao criar checkout:",
      error.response?.data || error.message
    );
  }
}

createPixCheckout();
