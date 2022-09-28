const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e",
    baseUrl: "http://localhost:3000",
  },
});
