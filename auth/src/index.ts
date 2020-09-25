import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('starting up ...');
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }

    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('connected to mongo db');
  } catch (err) {
    console.error(err);
  }
};

start();
