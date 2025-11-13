import { Trace } from "../tracing";
import { userPlanRepo } from "./user-plan.repo";

const DAYS_TO_ADD = 30;
const ONE_HOUR_IN_MILIS = 3_600_000;

class UserPlanService {
  @Trace({spanName: "userPlanService.addPlanToUser"})
  async addPlanToUser(userId: string, planId: string) {
    const startDate = new Date();
    const expirationDate = new Date(
      Date.now() + ONE_HOUR_IN_MILIS * 24 * DAYS_TO_ADD
    );

    const userPlanId = userPlanRepo.insertPlan({
      user_id: userId,
      plan_id: planId,
      start_date: startDate,
      expiration_date: expirationDate,
    });

    return userPlanId;
  }
}

export const userPlanService = new UserPlanService();
