import mongoose from "mongoose";

const { Schema } = mongoose;

const PeliculaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    cineId: {
        type: Schema.Types.ObjectId,
        ref: 'Cine',
        required: true
    }
});

export default mongoose.model('Pelicula', PeliculaSchema);
