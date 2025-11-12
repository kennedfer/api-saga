type PayloadWebhook = {
  id: string;
  event: string;
  dateCreated: string;
  payment: any;
};

export function mapWebhookToDb(payload: PayloadWebhook) {
  const p = payload.payment ?? {};

  return {
    payment_id: p.id ?? null,
    event: payload.event ?? null,
    date_created: payload.dateCreated ? new Date(payload.dateCreated) : null,

    payment_object: p.object ?? null,
    payment_date_created: p.dateCreated ? new Date(p.dateCreated) : null,
    customer: p.customer ?? null,
    checkout_session: p.checkoutSession ?? null,
    payment_link: p.paymentLink ?? null,
    value: p.value ?? null,
    net_value: p.netValue ?? null,
    original_value: p.originalValue ?? null,
    interest_value: p.interestValue ?? null,
    description: p.description ?? null,
    billing_type: p.billingType ?? null,
    pix_transaction: p.pixTransaction ?? null,
    pix_qr_code_id: p.pixQrCodeId ?? null,
    status: p.status ?? null,
    due_date: p.dueDate ? new Date(p.dueDate) : null,
    original_due_date: p.originalDueDate ? new Date(p.originalDueDate) : null,
    payment_date: p.paymentDate ? new Date(p.paymentDate) : null,
    client_payment_date: p.clientPaymentDate
      ? new Date(p.clientPaymentDate)
      : null,
    installment_number: p.installmentNumber ?? null,
    invoice_url: p.invoiceUrl ?? null,
    invoice_number: p.invoiceNumber ?? null,
    external_reference: p.externalReference ?? null,
    deleted: Boolean(p.deleted),
    anticipated: Boolean(p.anticipated),
    anticipable: Boolean(p.anticipable),
    credit_date: p.creditDate ? new Date(p.creditDate) : null,
    estimated_credit_date: p.estimatedCreditDate
      ? new Date(p.estimatedCreditDate)
      : null,
    transaction_receipt_url: p.transactionReceiptUrl ?? null,
    nosso_numero: p.nossoNumero ?? null,
    bank_slip_url: p.bankSlipUrl ?? null,
    last_invoice_viewed_date: p.lastInvoiceViewedDate
      ? new Date(p.lastInvoiceViewedDate)
      : null,
    last_bank_slip_viewed_date: p.lastBankSlipViewedDate
      ? new Date(p.lastBankSlipViewedDate)
      : null,
    postal_service: Boolean(p.postalService),

    discount: p.discount ?? null,
    fine: p.fine ?? null,
    interest: p.interest ?? null,
    escrow: p.escrow ?? null,
    refunds: p.refunds ?? null,
  };
}
