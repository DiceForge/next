const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ".dark-theme"],
  content: ["src/pages/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      "body-regular-100": [
        "0.625rem",
        {
          lineHeight: "0.875rem",
          fontWeight: "400",
        },
      ],
      "body-regular-200": [
        "0.75rem",
        {
          lineHeight: "1.125rem",
          fontWeight: "400",
        },
      ],
      "body-regular-300": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "400",
        },
      ],
      "body-regular-400": [
        "1rem",
        {
          lineHeight: "1.5rem",
          fontWeight: "400",
        },
      ],
      "body-regular-500": [
        "1.125rem",
        {
          lineHeight: "1.625rem",
          fontWeight: "400",
        },
      ],
      "body-regular-600": [
        "1.25rem",
        {
          lineHeight: "1.875rem",
          fontWeight: "400",
        },
      ],
      "body-medium-100": [
        "0.625rem",
        {
          lineHeight: "0.875rem",
          fontWeight: "500",
        },
      ],
      "body-medium-200": [
        "0.75rem",
        {
          lineHeight: "1.125rem",
          fontWeight: "500",
        },
      ],
      "body-medium-300": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "500",
        },
      ],
      "body-medium-400": [
        "1rem",
        {
          lineHeight: "1.5rem",
          fontWeight: "500",
        },
      ],
      "body-medium-500": [
        "1.125rem",
        {
          lineHeight: "1.625rem",
          fontWeight: "500",
        },
      ],
      "body-medium-600": [
        "1.25rem",
        {
          lineHeight: "1.875rem",
          fontWeight: "500",
        },
      ],
      "body-semibold-100": [
        "0.625rem",
        {
          lineHeight: "0.875rem",
          fontWeight: "600",
        },
      ],
      "body-semibold-200": [
        "0.75rem",
        {
          lineHeight: "1.125rem",
          fontWeight: "600",
        },
      ],
      "body-semibold-300": [
        "0.875rem",
        {
          lineHeight: "1.25rem",
          fontWeight: "600",
        },
      ],
      "body-semibold-400": [
        "1rem",
        {
          lineHeight: "1.5rem",
          fontWeight: "600",
        },
      ],
      "body-semibold-500": [
        "1.125rem",
        {
          lineHeight: "1.625rem",
          fontWeight: "600",
        },
      ],
      "body-semibold-600": [
        "1.25rem",
        {
          lineHeight: "1.875rem",
          fontWeight: "600",
        },
      ],
      header6: [
        "1.5rem",
        {
          lineHeight: "1.5rem",
          fontWeight: "600",
        },
      ],
      header5: [
        "2rem",
        {
          lineHeight: "2rem",
          fontWeight: "600",
        },
      ],
      header4: [
        "2.5rem",
        {
          lineHeight: "2.5rem",
          fontWeight: "600",
        },
      ],
      header3: [
        "3rem",
        {
          lineHeight: "3rem",
          fontWeight: "600",
        },
      ],
      header2: [
        "3.5rem",
        {
          lineHeight: "3.5rem",
          fontWeight: "600",
        },
      ],
      header1: [
        "4rem",
        {
          lineHeight: "4rem",
          fontWeight: "600",
        },
      ],
      title: [
        "4.5rem",
        {
          lineHeight: "1rem",
          fontWeight: "600",
        },
      ],
    },
    extend: {
      colors: {
        slate: generateScale("slate"),
        red: generateScale("red"),
        green: generateScale("green"),
        violet: generateScale("violet"),
        mint: generateScale("mint"),
        blue: generateScale("blue"),
        yellow: generateScale("yellow"),
        orange: generateScale("orange"),

        primary: generateScale("violet"),
        accent: generateScale("mint"),
        neutral: generateScale("slate"),
        danger: generateScale("red"),
        success: generateScale("green"),

        blackA: generateScale("blackA"),
        whiteA: generateScale("whiteA"),

        surface: "var(--surface)",
      },
      maxWidth: {
        container: "72rem",
      },
      boxShadow: {
        subtle: "0px 1px 2px rgba(17, 24, 28, 0.08)",
        "tab-line": "inset 0 -1px 0 var(--slate6)",
      },
      maxHeight: {
        available: "-webkit-fill-available",
      },
      borderRadius: {
        DEFAULT: "4px",
        lg: "8px",
      },
      fontFamily: {
        body: ["var(--font-body)", ...fontFamily.sans],
        display: ["var(--font-display)", ...fontFamily.sans],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--slate11)",
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "open-menu": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "close-menu": {
          "0%": {
            opacity: 1,
            transform: "translateY(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "open-menu": "open-menu 200ms ease-in-out",
        "close-menu": "close-menu 200ms ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

function generateScale(name) {
  let scale = Array.from({ length: 12 }, (_, i) => {
    let id = i + 1;
    return [
      [id, `var(--${name}${id})`],
      [`a${id}`, `var(--${name}A${id})`],
    ];
  }).flat();

  return Object.fromEntries(scale);
}
