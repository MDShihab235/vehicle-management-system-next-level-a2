import express, { Request, Response } from "express";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";

const app = express();

//parser
app.use(express.json());

//initializing DB
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello next level developers!");
});

// Auth Routes
app.use("/api/v1/auth", authRoutes);

// User Routes
app.use("/api/v1/users", userRoutes);

// Vehicle Routes
app.use("/api/v1/vehicles", vehicleRoutes);

// Booking Routes
app.use("/api/v1/bookings", bookingRoutes);

//Invalid route
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
