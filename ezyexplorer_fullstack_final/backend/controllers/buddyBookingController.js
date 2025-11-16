import BuddyBooking from "../models/BuddyBooking.js";
import Buddy from "../models/Buddy.js";

// Create buddy booking
export const createBuddyBooking = async (req, res) => {
  try {
    const { buddyId, destinationId, bookingDate, duration, meetingPoint, specialRequests } = req.body;
    const userId = req.user.id;

    const buddy = await Buddy.findById(buddyId);
    if (!buddy) {
      console.log(`❌ POST /api/buddy-bookings - Buddy not found`);
      return res.status(404).json({
        success: false,
        error: "Buddy not found"
      });
    }

    const totalAmount = buddy.hourlyRate * duration;

    const booking = new BuddyBooking({
      userId,
      buddyId,
      buddyName: buddy.name,
      destinationId,
      bookingDate,
      duration,
      totalAmount,
      meetingPoint,
      specialRequests
    });

    await booking.save();
    await booking.populate('buddyId', 'name email phone rating location');

    // Terminal message
    console.log(`✅ POST /api/buddy-bookings/${buddy.name} - Buddy booked successfully by user ${userId}`);

    res.status(201).json({
      success: true,
      message: "Buddy booked successfully",
      booking
    });
  } catch (error) {
    console.log(`❌ POST /api/buddy-bookings - Error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await BuddyBooking.find({ userId })
      .populate('buddyId', 'name email phone rating location')
      .sort({ bookingDate: -1 });

    console.log(`📋 GET /api/buddy-bookings - Retrieved ${bookings.length} bookings for user ${userId}`);

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.log(`❌ GET /api/buddy-bookings - Error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete buddy booking
export const deleteBuddyBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await BuddyBooking.findOne({ _id: id, userId }).populate('buddyId', 'name');

    if (!booking) {
      console.log(`❌ DELETE /api/buddy-bookings/${id} - Booking not found`);
      return res.status(404).json({
        success: false,
        error: "Booking not found"
      });
    }

    const buddyName = booking.buddyName || booking.buddyId?.name || 'Unknown';
    
    await BuddyBooking.findByIdAndDelete(id);

    // Terminal message
    console.log(`🗑️  DELETE /api/buddy-bookings/${buddyName} - Booking deleted successfully by user ${userId}`);

    res.json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (error) {
    console.log(`❌ DELETE /api/buddy-bookings - Error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete planned visit
export const deletePlannedVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'guest';

    const PlannedVisit = (await import("../models/PlannedVisit.js")).default;
    const visit = await PlannedVisit.findOne({ _id: id, userId });

    if (!visit) {
      console.log(`❌ DELETE /api/planned-visits/${id} - Visit not found`);
      return res.status(404).json({
        success: false,
        error: "Planned visit not found"
      });
    }

    const destinationName = visit.destinationName || 'Unknown';
    
    await PlannedVisit.findByIdAndDelete(id);

    // Terminal message
    console.log(`🗑️  DELETE /api/planned-visits/${destinationName} - Planned visit deleted by user ${userId}`);

    res.json({
      success: true,
      message: "Planned visit deleted successfully"
    });
  } catch (error) {
    console.log(`❌ DELETE /api/planned-visits - Error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
