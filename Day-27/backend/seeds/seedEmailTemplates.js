require("dotenv").config();

const connectDB = require("../src/config/db");
const EmailTemplate = require("../src/models/EmailTemplate");

const emailTemplates = require("./emailTemplates");

const seedEmailTemplates = async () => {
  try {
    await connectDB();

    console.log("Seeding email templates...");

    for (const template of emailTemplates) {
      await EmailTemplate.findOneAndUpdate(
        { key: template.key },
        template,
        { upsert: true, new: true }
      );

      console.log(`  ✓ ${template.key}`);
    }

    console.log("Email templates seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedEmailTemplates();
