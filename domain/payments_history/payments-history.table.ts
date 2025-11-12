import type {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
  } from 'kysely'
  
  export interface PaymentsHistoryTable {
    id: Generated<string>
    event: string
    date_created: ColumnType<Date, Date | undefined, never>
  
    payment_id: string
    payment_object: string | null
    payment_date_created: Date | null
    customer: string | null
    checkout_session: string | null
    payment_link: string | null
    value: number | null
    net_value: number | null
    original_value: number | null
    interest_value: number | null
    description: string | null
    billing_type: string | null
    pix_transaction: string | null
    pix_qr_code_id: string | null
    status: string | null
    due_date: Date | null
    original_due_date: Date | null
    payment_date: Date | null
    client_payment_date: Date | null
    installment_number: number | null
    invoice_url: string | null
    invoice_number: string | null
    external_reference: string | null
    deleted: boolean | null
    anticipated: boolean | null
    anticipable: boolean | null
    credit_date: Date | null
    estimated_credit_date: Date | null
    transaction_receipt_url: string | null
    nosso_numero: string | null
    bank_slip_url: string | null
    last_invoice_viewed_date: Date | null
    last_bank_slip_viewed_date: Date | null
    postal_service: boolean | null
  
    discount: unknown | null
    fine: unknown | null
    interest: unknown | null
    escrow: unknown | null
    refunds: unknown | null
  }
  
  export type PaymentsHistory = Selectable<PaymentsHistoryTable>
  export type NewPaymentHistory = Insertable<PaymentsHistoryTable>
  export type PaymentHistoryUpdate = Updateable<PaymentsHistoryTable>
  