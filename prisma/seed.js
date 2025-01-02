const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed categories
    const categories = [
        { urgency: "URGENT", context: "WORK" },
        { urgency: "HIGH_PRIORITY", context: "HOME" },
        { urgency: "LOW_PRIORITY", context: "WORK" },
        { urgency: "HIGH_PRIORITY", context: "OFFICE" }
    ];

    for (const category of categories) {
        await prisma.category.create({ data: category });
    }

    console.log("Categories seeded!");

    // Seed tasks
    const tasks = [
        {
            title: "Finish Backend Project",
            description: "Complete backend integration for the application",
            categoryId: 1
        },
        {
            title: "Learn Prisma",
            description: "Understand Prisma relations and migrations",
            categoryId: 2
        },
        {
            title: "Organize Files",
            description: "Clean and organize office documentation",
            categoryId: 3
        },
        {
            title: "Update project documentation",
            description: "Ensure all recent changes are documented",
            categoryId: 4
        },
        {
            title: "Organize Workspace",
            description: "Declutter and organize the workspace.",
            categoryId: 3
        },
        {
            title: "Prepare Presentation",
            description: "Create slides for the quarterly meeting.",
            categoryId: 4
        },
        {
            title: 'Renew Gym Membership',
            description: 'Visit the gym and renew membership.',
            categoryId: 5
        },
        {
            title: 'Family Movie Night',
            description: 'Organize a movie night with the family.',
            categoryId: 2
        },
        {
            title: 'Submit Tax Documents',
            description: 'Ensure all tax documents are submitted on time.',
            categoryId: 1
        },
        {
            title: 'Backup Files',
            description: 'Backup important documents to the cloud.',
            categoryId: 3
        },
        {
            title: 'Plan Vacation',
            description: 'Research and plan for the upcoming vacation.',
            categoryId: 5
        },
    ];

    for (const task of tasks) {
        await prisma.task.create({ data: task });
    }

    console.log("Tasks seeded!");
}

main()
    .then(() => {
        console.log("Seeding completed successfully!");
    })
    .catch((e) => {
        console.error("Seeding failed:", e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
