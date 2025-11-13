import { NewPaymentHistory } from "../../domain/payments_history/payments-history.table";
import { Trace } from "../tracing";
import { mapWebhookToDb } from "../utils/mapper";
import { userPlanService } from "../user-plan/user-plan.service";
import { paymentsHistoryRepo } from "../payments-history/payments-history.repo";

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
