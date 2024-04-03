import {
  IPaymentStatusRepository,
  EPaymentStatusResponse,
  PaymentStatus,
} from "../interfaces/IPaymentStatusRepository";
import { sql } from "../database/db";

class PaymentStatusRepository implements IPaymentStatusRepository {
  public async getAll(): Promise<PaymentStatus[]> {
    const paymentStatus = await sql<PaymentStatus[]>/*sql*/ `
      SELECT * FROM payments_status
    `;

    return paymentStatus;
  }

  public async getById(
    id: number
  ): Promise<PaymentStatus | EPaymentStatusResponse.PaymentStatusNotFound> {
    const [paymentStatus] = await sql<PaymentStatus[]>/*sql*/ `
      SELECT * FROM payments_status
      WHERE id = ${id}
    `;

    if (typeof paymentStatus === "undefined") {
      return EPaymentStatusResponse.PaymentStatusNotFound;
    }

    return paymentStatus;
  }

  public async create(
    name_status: string
  ): Promise<PaymentStatus | EPaymentStatusResponse.NameStatusAlreadyExists> {
    const [name_statusExists] = await sql<PaymentStatus[]>/*sql*/ `
      SELECT * FROM payments_status
      WHERE name_status = ${name_status}
    `;

    if (name_statusExists) {
      return EPaymentStatusResponse.NameStatusAlreadyExists;
    }

    const [paymentStatus] = await sql<PaymentStatus[]>/*sql*/ `
      INSERT INTO payments_status (name_status)
      VALUES (${name_status})

      RETURNING *
    `;

    return paymentStatus;
  }

  public async delete(
    id: number
  ): Promise<PaymentStatus | EPaymentStatusResponse.PaymentStatusNotFound> {
    const [paymentStatus] = await sql<PaymentStatus[]>/*sql*/ `
      SELECT * FROM payments_status
      WHERE id = ${id}
    `;

    if (typeof paymentStatus === "undefined") {
      return EPaymentStatusResponse.PaymentStatusNotFound;
    }

    const [paymentStatusDeleted] = await sql<PaymentStatus[]>/*sql*/ `
      DELETE FROM payments_status
      WHERE id = ${id}
    `;

    return paymentStatusDeleted;
  }
}

export { PaymentStatusRepository };
