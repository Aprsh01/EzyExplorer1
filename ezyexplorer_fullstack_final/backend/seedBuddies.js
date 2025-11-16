import mongoose from "mongoose";
import dotenv from "dotenv";
import Buddy from "./models/Buddy.js";
import connectDB from "./config/db.js";

dotenv.config();

const buddies = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91-9876543210',
    rating: 4.8,
    location: 'Delhi',
    bio: 'Passionate heritage guide with 8 years of experience exploring India\'s rich cultural treasures.',
    specialties: ['Heritage', 'History', 'Photography'],
    languages: ['Hindi', 'English', 'Punjabi'],
    hourlyRate: 500,
    availability: true,
    totalReviews: 250,
    verified: true,
    experience: 8,
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91-9876543211',
    rating: 4.6,
    location: 'Shimla',
    bio: 'Mountain trekking expert who loves sharing the beauty of Himalayan trails.',
    specialties: ['Mountain', 'Trekking', 'Adventure'],
    languages: ['Hindi', 'English'],
    hourlyRate: 400,
    availability: true,
    totalReviews: 180,
    verified: true,
    experience: 5,
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@example.com',
    phone: '+91-9876543212',
    rating: 4.9,
    location: 'Ahmedabad',
    bio: 'Expert in heritage sites with a decade of experience guiding tourists through India\'s monuments.',
    specialties: ['Heritage', 'Architecture', 'Culture'],
    languages: ['Hindi', 'English', 'Gujarati'],
    hourlyRate: 600,
    availability: true,
    totalReviews: 320,
    verified: true,
    experience: 10,
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    name: 'Neha Singh',
    email: 'neha.singh@example.com',
    phone: '+91-9876543213',
    rating: 4.7,
    location: 'Goa',
    bio: 'Beach and coastal guide specializing in water sports and beach activities.',
    specialties: ['Beach', 'Water Sports', 'Coastal'],
    languages: ['Hindi', 'English', 'Marathi'],
    hourlyRate: 450,
    availability: true,
    totalReviews: 210,
    verified: true,
    experience: 6,
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
  },
  {
    name: 'Vikram Reddy',
    email: 'vikram.reddy@example.com',
    phone: '+91-9876543214',
    rating: 4.8,
    location: 'Manali',
    bio: 'Mountain guide with extensive knowledge of Himalayan trails and adventure sports.',
    specialties: ['Mountain', 'Adventure', 'Skiing'],
    languages: ['Hindi', 'English', 'Telugu'],
    hourlyRate: 550,
    availability: true,
    totalReviews: 275,
    verified: true,
    experience: 7,
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
  },
  {
    name: 'Anjali Desai',
    email: 'anjali.desai@example.com',
    phone: '+91-9876543215',
    rating: 4.5,
    location: 'Jaipur',
    bio: 'Heritage and cultural guide with a passion for Rajasthan\'s royal history.',
    specialties: ['Heritage', 'Culture', 'Royal History'],
    languages: ['Hindi', 'English', 'Gujarati'],
    hourlyRate: 350,
    availability: true,
    totalReviews: 150,
    verified: true,
    experience: 4,
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop'
  }
];

async function seedBuddies() {
  try {
    await connectDB();
    
    // Clear existing buddies
    await Buddy.deleteMany({});
    console.log('🗑️  Cleared existing buddies');
    
    // Insert new buddies
    const createdBuddies = await Buddy.insertMany(buddies);
    console.log(`✅ Successfully seeded ${createdBuddies.length} buddies:`);
    createdBuddies.forEach(buddy => {
      console.log(`   - ${buddy.name} (${buddy.location}) - ₹${buddy.hourlyRate}/hr`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding buddies:', error);
    process.exit(1);
  }
}

seedBuddies();
