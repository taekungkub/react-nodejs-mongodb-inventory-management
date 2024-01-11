import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173/",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  env: {
    user_email: "fake@gmail.com", //for fake user testting
    user_password: "!Test123456",
  },
})
