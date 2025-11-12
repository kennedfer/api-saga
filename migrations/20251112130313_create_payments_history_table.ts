import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("payments_history", (table) => {
    table.string('payment_id').notNullable().primary();
    
    table.string('event').notNullable();
    table.timestamp('date_created').notNullable();

    table.string('payment_object').defaultTo('payment');
    table.date('payment_date_created');
    table.string('customer');
    table.string('checkout_session');
    table.string('payment_link');
    table.decimal('value', 10, 2);
    table.decimal('net_value', 10, 2);
    table.decimal('original_value', 10, 2);
    table.decimal('interest_value', 10, 2);
    table.text('description');
    table.string('billing_type');
    table.string('pix_transaction');
    table.string('pix_qr_code_id');
    table.string('status');
    table.date('due_date');
    table.date('original_due_date');
    table.date('payment_date');
    table.date('client_payment_date');
    table.integer('installment_number');
    table.string('invoice_url');
    table.string('invoice_number');
    table.string('external_reference');
    table.boolean('deleted').defaultTo(false);
    table.boolean('anticipated').defaultTo(false);
    table.boolean('anticipable').defaultTo(false);
    table.date('credit_date');
    table.date('estimated_credit_date');
    table.string('transaction_receipt_url');
    table.string('nosso_numero');
    table.string('bank_slip_url');
    table.timestamp('last_invoice_viewed_date');
    table.timestamp('last_bank_slip_viewed_date');
    table.boolean('postal_service').defaultTo(false);

    table.jsonb('discount');
    table.jsonb('fine');
    table.jsonb('interest');
    table.jsonb('escrow');
    table.jsonb('refunds');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("payments_history");
}
