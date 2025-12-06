import { pool } from "../../config/db";

const createVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicleName,
    vehicleType,
    registrationNumber,
    dailyRentPrice,
    availabilityStatus,
  } = payload;
  console.log("Payload here where: ", payload);
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [
      vehicleName,
      vehicleType,
      registrationNumber,
      dailyRentPrice,
      availabilityStatus,
    ]
  );
  return result;
};

export const vehicleServices = {
  createVehicle,
};
