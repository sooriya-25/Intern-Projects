const EmailTemplate = require("../models/EmailTemplate");
const { render } = require("../utils/renderTemplate");

const getRenderedTemplate = async (key, data = {}) => {
  const template = await EmailTemplate.findOne({ key, isActive: true });

  if (!template) {
    throw new Error(`Email template "${key}" not found or inactive.`);
  }

  return {
    subject: render(template.subject, data),
    text: render(template.text, data),
    html: render(template.html, data),
  };
};

module.exports = { getRenderedTemplate };
