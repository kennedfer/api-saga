import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface UserPlanTable {
  id: Generated<string>;
  user_id: string;
  plan_id: string;
  start_date: Date;
  expiration_date: Date;
  created_at: ColumnType<Date, Date | undefined, never>;
}

export type UserPlan = Selectable<UserPlanTable>;
export type NewUserPlan = Insertable<UserPlanTable>;
export type UserPlanUpdate = Updateable<UserPlanTable>;
