module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderStyle: ["hover", "focus", "active", "responsive"],
    },
  },
  plugins: [],
};
