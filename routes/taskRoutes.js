const express = require("express");
const path = require("path");
const { authenticateJWT } = require("../middleware/authMiddleware");
const {
  getTasks,
  createTaskWithCategory,
  filterTasksByUrgency,
  filterTasksByContext,
  filterTasksByUrgencyAndContext,
  updateTaskCategory,
  getAllTasksWithCategories,
  getTasksFromLastFiveDays,
} = require(path.resolve(__dirname, "../controllers/taskcontroller"));

const router = express.Router();

// Route to handle all GET tasks with filtering and pagination
router.get("/tasks", authenticateJWT, async (req, res) => {
  console.log("GET /tasks called with query:", req.query);
  const { urgency, context, page = 1, limit = 6 } = req.query; // Extract query parameters for filtering and pagination

  try {
    let tasks;

    // Pagination calculation
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    // If both urgency and context are provided
    if (urgency && context) {
      tasks = await filterTasksByUrgencyAndContext(
        urgency,
        context,
        skip,
        take
      );
    }
    // If only urgency is provided
    else if (urgency) {
      tasks = await filterTasksByUrgency(urgency, skip, take);
    }
    // If only context is provided
    else if (context) {
      tasks = await filterTasksByContext(context, skip, take);
    }
    // If no filter parameters are provided, return all tasks
    else {
      tasks = await getTasks(skip, take);
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Route to create a new task with a category
router.post("/tasks", authenticateJWT, async (req, res) => {
  const { title, description, categoryId } = req.body;
  try {
    const newTask = await createTaskWithCategory(
      title,
      description,
      categoryId
    );
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Route to update a task's category
router.put("/tasks/:id/category", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { categoryId } = req.body;
  try {
    const updatedTask = await updateTaskCategory(parseInt(id), categoryId);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task category" });
  }
});

// Route to get tasks with categories
router.get("/tasks-with-categories", authenticateJWT, async (req, res) => {
  try {
    const tasks = await getAllTasksWithCategories();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to get tasks with categories" });
  }
});

// Route to get tasks created in the last 5 days
router.get("/tasks/recent", authenticateJWT, async (req, res) => {
  try {
    const tasks = await getTasksFromLastFiveDays();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to get recent tasks" });
  }
});

module.exports = router;
