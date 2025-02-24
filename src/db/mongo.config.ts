// Importing essential packages
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Exporting dbConnect() function to establish mongodb connection
export async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI!, {tls: true})
    console.log("Database Connected Succefully")
  } catch (error) {
    console.log("Database Connection Error: ", error)
  }
}