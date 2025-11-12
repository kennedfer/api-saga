import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("plans", (table) => {
    table.decimal("price", 10, 3).notNullable();
  });

  await knex("plans").insert([
    { name: "Standard", price:10.00 },
    { name: "Pro", price:20.00 },
    { name: "Supremo", price: 30.00 },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("plans", table => {
    table.dropColumn("price")
  });
}
