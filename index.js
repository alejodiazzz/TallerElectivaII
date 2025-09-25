import express from 'express';
import connectDB from './drivers/connect-db.mjs';
import cineRoutes from './routes/cine.mjs';
import peliculaRoutes from './routes/pelicula.mjs';
import authRoutes from './routes/auth.mjs';
import dotenv from 'dotenv';

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger-config.mjs';

dotenv.config();

const app = express();

app.set('PORT', process.env.PORT || 6972);

// Middleware
app.use(express.json());

// Connect database
connectDB();

// Swagger Docs
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/cines', cineRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/auth', authRoutes);

// servidor
app.listen(app.get('PORT'), () => {
  console.log(`Server listening on port ${app.get('PORT')}`);
});
