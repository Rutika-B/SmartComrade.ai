const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { name: "CEO or Founders" },
        { name: "Politicians"},
        { name: "Musicians" },
        { name: "Investors" },
        { name: "Actors" },
        { name: "Sports Personalities" },
        { name: "Monks" },
        { name: "Scientists" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    await db.$disconnect();
  }
}
main();