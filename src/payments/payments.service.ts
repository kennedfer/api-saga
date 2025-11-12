import { NewPaymentHistory } from "../../domain/payments_history/payments-history.table";
import { Trace } from "../tracing";
import { userPlanRepo } from "../user-plan/user-plan.repo";
import { paymentsRepo } from "./payments.repo";
import { mapWebhookToDb } from "../utils/mapper";
import { asaasApi } from "../utils/axios";
import { userRepo } from "../user/user.repo";

export class PaymentService {
  @Trace({ spanName: "paymentService.processPayment" })
  async processPayment(payment: any): Promise<void> {
    //PROCURAR MODO DE IDENTIFICAR O USUARIO VIA PAGAMENTO
    //IDENTIFICAR O PLANO TAMBEM
    //REGISTRAR NO BANCO DE HISTORICO DE PAGAMENTOS
    //REGISTRAR NO BANCO DE PLANOS DE USUÁRIO
    // userPlanRepo.insertPlan({user_id: x, plan_id: y})

    //se usarmos checkout da pra por tudo em external reference

    //********* mapeia a estrutura do pagamento e salva no historico **********
    const input = mapWebhookToDb(payment);
    const paymentId = await paymentsRepo.insertPayment(
      input as NewPaymentHistory
    );



    const { data } = await asaasApi.get(
      "/customers/" + payment.payment.customer
    );

    const paymentCpf = data.cpfCnpj;

    const userId = (await userRepo.getUserByCpf(paymentCpf))?.id;

    //PEDIR PROPOSTA DE ATENDIMENTO HOSPITALAR (MAIS AVANCADO) - APENAS PARA O PESSOAL DA SAÚDE - CHECAR O LIMITE DE PESSOAS DA TURMA - 12

    // userPlanRepo.insertPlan({user_id: x, plan_id: y})
    //Só
    return;
  }
}

export const paymentService = new PaymentService();
