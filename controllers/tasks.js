const Task = require("../models/Task")

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({});
        res.status(200).json(allTasks);
    } catch (error) {
        res.status(500).json(error);
    }
};

const createSingleTask = async (req, res) => {
    try {
        const createSingleTask = await Task.create(req.body);
        res.status(200).json(createSingleTask);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getSingleTask = async (req, res) => {
    try {
        const getSingleTask = await Task.findOne({ _id: req.params.id });
        if (!getSingleTask) {
            return res.status(404).json(`_id:${req.params.id} not exists`);
        }
        res.status(200).json(getSingleTask);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateTask = async (req, res) => {
    try {
        const updateTask = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updateTask) {
            return res.status(404).json(`_id:${req.params.id} not exists`);
        }
        res.status(200).json(updateTask);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findOneAndDelete(
            { _id: req.params.id }
        );
        if (!deleteTask) {
            return res.status(404).json(`_id:${req.params.id} not exists`);
        }
        res.status(200).json(deleteTask);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAllTasks,
    createSingleTask,
    getSingleTask,
    updateTask,
    deleteTask,
};