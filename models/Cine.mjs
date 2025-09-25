import mongoose from "mongoose";

const { Schema } = mongoose;

const CineSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    peliculas: [{
        type: Schema.Types.ObjectId,
        ref: 'Pelicula'
    }]
});

export default mongoose.model('Cine', CineSchema);
