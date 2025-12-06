import { Pool } from "pg";
import config from ".";

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

const initDB = async () => {
  // User table
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id	SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'customer'
        ) 
    `);

  // Vehicle table
  await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id	SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(200) NOT NULL,
        type VARCHAR(100),
        registration_number VARCHAR(200) UNIQUE NOT NULL,
        daily_rent_price INT NOT NULL,
        availability_status VARCHAR(100)
        )  
    `);

  // Booking table
  await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings(
        id	SERIAL PRIMARY KEY,
        customer_id	INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price INT NOT NULL,
        status VARCHAR(100) 
        )
    `);
};

export default initDB;
