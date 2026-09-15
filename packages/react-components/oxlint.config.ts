import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "warn",
  },
  plugins: [
    "typescript",
    "unicorn",
    "oxc",
    "react",
    "react-perf",
    "import"
  ],
  env: {
    builtin: true,
  },
  rules: {
  },
});