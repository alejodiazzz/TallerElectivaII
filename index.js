import express from 'express';
import connectDB from './drivers/connect-db.mjs';
import cineRoutes from './routes/cine.mjs';
import peliculaRoutes from './routes/pelicula.mjs';
import authRoutes from './routes/auth.mjs';
import usuarioRoutes from './routes/usuario.mjs'; // Importar rutas de usuario
import dotenv from 'dotenv';
import path from 'path'; // Importar path
import { fileURLToPath } from 'url'; // Importar fileURLToPath

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './swagger-config.mjs';

dotenv.config();

const app = express();

app.set('PORT', process.env.PORT || 6972);

// Middleware
import cors from 'cors';

app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Connect database
connectDB();

// Swagger Docs
const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/cines', cineRoutes);
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes); // Usar rutas de usuario

// Definir __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para servir la interfaz de prueba
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// servidor
app.listen(app.get('PORT'), () => {
  console.log(`Server listening on port ${app.get('PORT')}`);
});

