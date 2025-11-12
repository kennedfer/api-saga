import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", table => {
    table.string("cpf", 11).unique().notNullable() //CFP unformatted: 00000000000
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", table => {
    table.dropColumn("cpf");
  })
}
