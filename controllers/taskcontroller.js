const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

// Create a new task
const createTask = async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    try {
        const newTask = await prisma.task.create({
            data: { title, description },
        });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedTask = await prisma.task.update({
            where: { id: Number(id) },
            data: { title, description },
        });
        res.json(updatedTask);
    } catch (error) {
        res.status(404).json({ error: 'Task not found' });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.task.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: 'Task not found' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
