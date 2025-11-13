import { NewPaymentHistory } from "../../domain/payments_history/payments-history.table";
import { Trace } from "../tracing";
import { mapWebhookToDb } from "../utils/mapper";
import { userPlanService } from "../user-plan/user-plan.service";
import { paymentsHistoryRepo } from "../payments-history/payments-history.repo";

// {
//   id: 'evt_20f793f686aa4783d486a40e3c6b91d1&12558163',
//   event: 'CHECKOUT_PAID',
//   dateCreated: '2025-11-12 21:14:57',
//   checkout: {
//     id: '15e844d1-b9ed-48fe-a202-b28b1e56057a',
//     link: null,
//     status: 'PAID',
//     minutesToExpire: 1440,
//     externalReference: 'Plano Standard - 1610b448-26c4-445d-86c8-e700f477b6bd',
//     billingTypes: [ 'PIX' ],
//     chargeTypes: [ 'DETACHED' ],
//     callback: {
//       cancelUrl: 'https://eighty-banks-sleep.loca.lt/cancel',
//       successUrl: 'https://eighty-banks-sleep.loca.lt/success',
//       expiredUrl: 'https://eighty-banks-sleep.loca.lt/expired'
//     },
//     items: [ [Object] ],
//     subscription: null,
//     installment: null,
//     split: null,
//     customer: null,
//     customerData: null
//   }
// }

export class AsaasWebhookService {
  @Trace({ spanName: "asaasWebhookService.processPayment" })
  async processPayment(payment: any): Promise<void> {
    //********* mapeia a estrutura do pagamento e salva no historico **********
    try {
      const input = mapWebhookToDb(payment);
      const entryId = await paymentsHistoryRepo.insertPayment(
        input as NewPaymentHistory
      );

      console.log("PAGAMENTO SALVO: " + entryId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Trace({ spanName: "asaasWebhookService.processCheckout" })
  async processCheckout(checkout: any): Promise<void> {
    try {
      const [userId, planId] = checkout.externalReference.split("_");
      const entryId = await userPlanService.addPlanToUser(userId, planId);

      console.log("ASSINATURA DE PLANO SALVA: " + entryId);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const asaasWebhookService = new AsaasWebhookService();
