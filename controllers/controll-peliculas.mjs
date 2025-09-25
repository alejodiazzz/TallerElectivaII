import Pelicula from '../models/Pelicula.mjs';
import Cine from '../models/Cine.mjs'; // Importar el modelo Cine

async function findAll(req, res) {
    try {
        const result = await Pelicula.find().populate('cineId'); // Populate para obtener la información del cine
        res.status(200).json({ "state": true, "data": result });
    } catch(error){
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

async function findById(req, res) {
    try {
        const { id } = req.params;
        const result = await Pelicula.findById(id).populate('cineId');
        if (!result) {
            return res.status(404).json({ "state": false, "error": "Pelicula not found" });
        }
        res.status(200).json({ "state": true, "data": result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

async function save(req, res) {
    try {
        const pelicula = new Pelicula(req.body);
        const result = await pelicula.save();

        // Sincronizar la relación con el Cine
        const cine = await Cine.findById(result.cineId);
        if (cine) {
            cine.peliculas.push(result._id);
            await cine.save();
        }

        res.status(201).json({ "state": true, "data": result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const result = await Pelicula.findByIdAndUpdate(id, req.body, { new: true }).populate('cineId');
        if (!result) {
            return res.status(404).json({ "state": false, "error": "Pelicula not found" });
        }
        res.status(200).json({ "state": true, "data": result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const result = await Pelicula.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ "state": false, "error": "Pelicula not found" });
        }

        // Opcional: Quitar la película del array de películas del cine
        if (result.cineId) {
            const cine = await Cine.findById(result.cineId);
            if (cine) {
                cine.peliculas = cine.peliculas.filter(peliculaId => peliculaId.toString() !== id);
                await cine.save();
            }
        }

        res.status(200).json({ "state": true, "data": result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

export {
    findAll,
    findById,
    save,
    update,
    remove
};
