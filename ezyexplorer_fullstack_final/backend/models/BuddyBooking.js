import mongoose from "mongoose";

const buddyBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buddyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buddy',
    required: true
  },
  buddyName: {
    type: String,
    required: true
  },
  destinationId: {
    type: String
  },
  bookingDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 4
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  meetingPoint: {
    type: String
  },
  specialRequests: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model("BuddyBooking", buddyBookingSchema);
