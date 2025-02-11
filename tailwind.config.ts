import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        orangeSTI: "#F58A56",
        blueSTI: "#0853A5",
        yellowUDINUS: "#F5BD45",
        redUNGGUL: "#D42027",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
