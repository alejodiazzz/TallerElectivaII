import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a la base de datos de MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Detener la aplicación si no se puede conectar a la DB
  }
};

export default connectDB;
