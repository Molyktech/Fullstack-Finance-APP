
import mongoose from 'mongoose';
import { config } from '../config/app.config';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    process.exit(1);
  }
};

export default connectDB;