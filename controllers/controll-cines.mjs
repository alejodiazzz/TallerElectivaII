import Cine from '../models/Cine.mjs';

async function findAll(req, res) {
    try {
        const result = await Cine.find();
        res.status(200).json({ "state": true, "data": result });
    } catch(error){
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

async function findById(req, res) {
    try {
        const { id } = req.params;
        const result = await Cine.findById(id);
        if (!result) {
            return res.status(404).json({ "state": false, "error": "Cine not found" });
        }
        res.status(200).json({ "state": true, "data": result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

async function save(req, res) {
    try {
        const cine = new Cine(req.body);
        const result = await cine.save();
        res.status(201).json({ "state": true, "data": result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ "state": false, "error": "Internal Server Error" });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const result = await Cine.findByIdAndUpdate(id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ "state": false, "error": "Cine not found" });
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
        const result = await Cine.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ "state": false, "error": "Cine not found" });
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
