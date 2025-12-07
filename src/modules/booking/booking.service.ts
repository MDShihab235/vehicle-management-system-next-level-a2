import bcrypt from "bcryptjs";
import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const {
    customerId,
    vehicleId,
    rentStartDate,
    rentEndDate,
    totalPrice,
    status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date,rent_end_date, total_price,status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [customerId, vehicleId, rentStartDate, rentEndDate, totalPrice, status]
  );

  return result;
};

export const bookingServices = {
  createBooking,
};
