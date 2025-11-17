import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

// Routes
import exploreRoutes from "./routes/exploreRoutes.js";
import buddyRoutes from "./routes/buddyRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import plannedVisitRoutes from "./routes/plannedVisitRoutes.js";
import buddyBookingRoutes from "./routes/buddyBookingRoutes.js";

// Middleware
import { requestLogger, analyticsLogger, getApiStats } from "./middleware/logger.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { rateLimiter } from "./middleware/rateLimiter.js";

// ES Module __dirname alternative
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();

// Configure EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(analyticsLogger);

// Rate limiting (100 requests per 15 minutes)
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));

// Serve static files from the frontend directory
const frontendPath = path.join(__dirname, "../frontend/finalized ezyexplorer");
app.use(express.static(frontendPath));

// Also serve views directory for any assets
app.use(express.static(path.join(__dirname, 'views')));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/explore", exploreRoutes);
app.use("/api/buddies", buddyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/planned-visits", plannedVisitRoutes);
app.use("/api/buddy-bookings", buddyBookingRoutes);

// Analytics endpoint
app.get("/api/stats", getApiStats);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Render home page using EJS template
app.get("/", (req, res) => {
  res.render("index", { 
    title: "EzyExplorer - Discover India's Hidden Gems",
    page: "home"
  });
});

// Additional template routes
app.get("/explore", (req, res) => {
  res.render("index", { 
    title: "Explore Destinations - EzyExplorer",
    page: "explore"
  });
});

app.get("/about", (req, res) => {
  res.render("index", { 
    title: "About Us - EzyExplorer",
    page: "about"
  });
});

// Serve index.html for all non-API routes (fallback for SPA support)
// This ensures hash navigation works properly - backend ignores hash
app.get("*", (req, res) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith("/api")) {
    res.render("index", { 
      title: "EzyExplorer - Discover India's Hidden Gems",
      page: "home"
    });
  }
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// port changed to 9000 from 3000 
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 API Stats: http://localhost:${PORT}/api/stats`);
  console.log(`🔄 Nodemon active - watching for changes...\n`);
});