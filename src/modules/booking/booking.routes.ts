import { Router } from "express";
import { bookingControllers } from "./booking.controller";

const router = Router();

router.post("/", bookingControllers.createBooking);
router.get("/", bookingControllers.getAllBookings);
router.put("/:id", bookingControllers.updateBooking);
router.delete("/:id", bookingControllers.deleteBooking);

export const bookingRoutes = router;
