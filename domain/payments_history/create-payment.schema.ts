import { z } from 'zod'

export const createPaymentHistorySchema = z.object({
  id: z.string().uuid(),
  event: z.literal('PAYMENT_RECEIVED'),
  date_created: z.preprocess(
    (v) => (typeof v === 'string' || v instanceof Date ? new Date(v) : v),
    z.date()
  ),

  payment_id: z.string(),
  payment_object: z.string().default('payment'),
  payment_date_created: z.preprocess(
    (v) => (typeof v === 'string' || v instanceof Date ? new Date(v) : v),
    z.date()
  ).nullable(),
  customer: z.string().nullable(),
  value: z.number(),
  net_value: z.number(),
  description: z.string().nullable(),
  billing_type: z.string(),
  pix_transaction: z.string().nullable(),
  pix_qr_code_id: z.string().nullable(),
  status: z.literal('RECEIVED'),
  due_date: z.preprocess(
    (v) => (typeof v === 'string' || v instanceof Date ? new Date(v) : v),
    z.date()
  ),
  payment_date: z.preprocess(
    (v) => (typeof v === 'string' || v instanceof Date ? new Date(v) : v),
    z.date()
  ),
  client_payment_date: z.preprocess(
    (v) => (typeof v === 'string' || v instanceof Date ? new Date(v) : v),
    z.date()
  ),
  credit_date: z.preprocess(
    (v) => (typeof v === 'string' || v instanceof Date ? new Date(v) : v),
    z.date()
  ),
  invoice_number: z.string(),
  invoice_url: z.string().url(),
  transaction_receipt_url: z.string().url().nullable(),
})

export type CreatePaymentHistoryInput = z.infer<typeof createPaymentHistorySchema>
