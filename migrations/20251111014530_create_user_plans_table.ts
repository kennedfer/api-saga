import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_plans", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // usa UUID como PK

    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .uuid("plan_id")
      .notNullable()
      .references("id")
      .inTable("plans")
      .onDelete("CASCADE");

    table.date("start_date").notNullable();
    table.date("expiration_date").notNullable();

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("user_plans");
}
