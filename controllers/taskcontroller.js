const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all tasks with pagination
const getTasks = async (skip = 0, take = 6) => {
  return await prisma.task.findMany({
    skip: skip,
    take: take,
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          urgency: true,
          context: true,
        },
      },
    },
  });
};

// Create a new task with a category
const createTaskWithCategory = async (title, description, categoryId) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      category: { connect: { id: categoryId } },
    },
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          urgency: true,
          context: true,
        },
      },
    },
  });
};

// Filter tasks by urgency with pagination
const filterTasksByUrgency = async (urgency, skip = 0, take = 6) => {
  return await prisma.task.findMany({
    where: {
      category: { urgency },
    },
    skip: skip,
    take: take,
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          urgency: true,
          context: true,
        },
      },
    },
  });
};

// Filter tasks by context with pagination
const filterTasksByContext = async (context, skip = 0, take = 6) => {
  return await prisma.task.findMany({
    where: {
      category: { context },
    },
    skip: skip,
    take: take,
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          urgency: true,
          context: true,
        },
      },
    },
  });
};

// Filter tasks by both urgency and context with pagination
const filterTasksByUrgencyAndContext = async (
  urgency,
  context,
  skip = 0,
  take = 6
) => {
  return await prisma.task.findMany({
    where: {
      AND: [
        {
          category: { urgency: urgency },
        },
        {
          category: { context: context },
        },
      ],
    },
    skip: skip,
    take: take,
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          urgency: true,
          context: true,
        },
      },
    },
  });
};

// Update a task's category
const updateTaskCategory = async (taskId, categoryId) => {
  return await prisma.task.update({
    where: { id: taskId },
    data: { category: { connect: { id: categoryId } } }, // Connect to a different category
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          urgency: true,
          context: true,
        },
      },
    },
  });
};

// Retrieve all tasks with their categories
const getAllTasksWithCategories = async () => {
  return await prisma.task.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          urgency: true,
          context: true,
        },
      },
    },
  });
};

// Query tasks from the last five days
const getTasksFromLastFiveDays = async () => {
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

  return await prisma.task.findMany({
    where: {
      createdAt: { gte: fiveDaysAgo },
    },
  });
};

module.exports = {
  getTasks,
  createTaskWithCategory,
  filterTasksByUrgency,
  filterTasksByContext,
  filterTasksByUrgencyAndContext,
  updateTaskCategory,
  getAllTasksWithCategories,
  getTasksFromLastFiveDays,
};
