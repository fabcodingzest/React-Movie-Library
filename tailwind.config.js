module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-sm": "repeat(auto-fit, minmax(8rem, 12rem))",
        "auto-lg": "repeat(auto-fit, minmax(10rem, 16rem))",
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover", "focus", "active", "responsive", "group-hover"],
      borderStyle: ["hover", "focus", "active", "responsive", "group-hover"],
      gridTemplateColumns: [
        "hover",
        "focus",
        "active",
        "responsive",
        "group-hover",
      ],
    },
  },
  plugins: [],
};
