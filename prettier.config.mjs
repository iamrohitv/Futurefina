/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./apps/web/src/app/globals.css",
  tailwindFunctions: ["cn", "cva"],
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
};

export default config;
