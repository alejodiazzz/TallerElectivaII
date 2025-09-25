const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CineApp API',
      version: '1.0.0',
      description: 'API para la gestión de cines y películas, documentada con Swagger.',
    },
    servers: [
      {
        url: 'http://localhost:6972',
        description: 'Servidor de Desarrollo'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  // Archivos que contienen la documentación de la API (rutas)
  apis: ['./routes/*.mjs'],
};

export default swaggerOptions;
