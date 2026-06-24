/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  printWidth: 90,
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};

export default config;