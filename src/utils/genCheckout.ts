import { asaasApi } from "./axios";

const request = asaasApi.post("/checkouts", {
  billingTypes: ["PIX"],
  chargeTypes: ["ONETIME"],
  externalReference: "Plano Standard - 1610b448-26c4-445d-86c8-e700f477b6bd",
  callback: {
    successUrl: "https://eighty-banks-sleep.loca.lt",
    cancelUrl: "https://eighty-banks-sleep.loca.lt",
    expiredUrl: "https://eighty-banks-sleep.loca.lt",
  },
  items: [
    {
      externalReference: "1610b448-26c4-445d-86c8-e700f477b6bd",
      description: "Plano Standard",
      name: "plano",
      quantity: 1,
      value: 10,
    },
  ],
})

request.then(data => console.log(data));
