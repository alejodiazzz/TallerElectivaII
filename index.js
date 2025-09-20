import express from 'express';
import connectDB from './drivers/connect-db.mjs';
import cineRoutes from './routes/cine.mjs';
import peliculaRoutes from './routes/pelicula.mjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.set('PORT', process.env.PORT || 6972);

// Middleware
app.use(express.json());

// Connect database
connectDB();

// Routes
app.use('/cines', cineRoutes);
app.use('/peliculas', peliculaRoutes);

// Start the server
app.listen(app.get('PORT'), () => {
  console.log(`Server listening on port ${app.get('PORT')}`);
});
