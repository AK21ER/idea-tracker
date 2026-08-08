import mongoose from 'mongoose';
import dns from 'dns';
import { config } from './environments';

export const connectDB = async (): Promise<void> => {
  try {
    const servers = dns.getServers();
    if (servers.includes('127.0.0.1') || servers.includes('::1') || servers.length === 0) {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    }
    await mongoose.connect(config.mongoUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};