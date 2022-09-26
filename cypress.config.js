const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e",
    setupNodeEvents(on, config) {
      config.baseUrl = "http://localhost:3000";
      return config;
    },
  },
});
