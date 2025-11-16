import express from "express";
import {
  createBuddyBooking,
  getUserBookings,
  deleteBuddyBooking,
  deletePlannedVisit
} from "../controllers/buddyBookingController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.use(verifyToken);

// Buddy booking routes
router.post("/", createBuddyBooking);
router.get("/", getUserBookings);
router.delete("/:id", deleteBuddyBooking);

// Planned visit deletion route
router.delete("/planned-visits/:id", deletePlannedVisit);

export default router;
