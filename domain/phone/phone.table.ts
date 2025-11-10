import type {
    ColumnType,
    Generated,
    Insertable,
    Selectable,
    Updateable,
} from 'kysely'

export interface PhoneTable {
    id: Generated<string>
    phone_number: string
    user_id: string;
    created_at: ColumnType<Date, Date | undefined, never>
}

export type Phone = Selectable<PhoneTable>
export type NewPhone = Insertable<PhoneTable>
export type PhoneUpdate = Updateable<PhoneTable>
