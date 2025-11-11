import { Trace } from "../tracing";
import { userPlanRepo } from "../user-plan/user-plan.repo";

export class PaymentService {
  @Trace({ spanName: "paymentService.processPayment" })
  async processPayment(body: any) {
    //PROCURAR MODO DE IDENTIFICAR O USUARIO VIA PAGAMENTO
    //IDENTIFICAR O PLANO TAMBEM
    //REGISTRAR NO BANCO DE HISTORICO DE PAGAMENTOS
    //REGISTRAR NO BANCO DE PLANOS DE USUÁRIO
      // userPlanRepo.insertPlan({user_id: x, plan_id: y})

    //Só
    console.log("Deu bom");
  }
}

export const paymentService = new PaymentService();
