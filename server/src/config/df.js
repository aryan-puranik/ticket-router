import mongoose from 'mongoose';

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB });
  console.log(`MongoDB connected → ${process.env.MONGO_DB}`);
}