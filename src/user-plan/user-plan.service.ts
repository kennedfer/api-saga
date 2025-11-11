import { userPlanRepo } from "./user-plan.repo";

const DAYS_TO_ADD = 30;

class UserPlanService {
  async addPlanToUser(userId: string, planId: string) {
    const startDate = new Date();
    const expirationDate = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * DAYS_TO_ADD
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
