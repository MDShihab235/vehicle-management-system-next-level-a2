import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  let {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = payload;

  const totalRentPrice: unknown =
    ((new Date(rent_end_date as Date).getTime() -
      new Date(rent_start_date as Date).getTime()) /
      (1000 * 60 * 60 * 24)) *
    (total_price as number);
  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date,rent_end_date, total_price,status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalRentPrice,
      status,
    ]
  );

  return result;
};

const getBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};

const updateBooking = async (
  customer_id: any,
  vehicle_id: any,
  rent_start_date: any,
  rent_end_date: any,
  total_price: any,
  status: any,
  id: any
) => {
  const result = await pool.query(
    `UPDATE bookings SET customer_id=$1, vehicle_id=$2, rent_start_date=$3, rent_end_date=$4, total_price=$5, status=$6 WHERE id=$7 RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      status,
      id,
    ]
  );
  return result;
};

const deleteBooking = async (id: any) => {
  const result = await pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
  return result;
};
export const bookingServices = {
  createBooking,
  getBookings,
  updateBooking,
  deleteBooking,
};
