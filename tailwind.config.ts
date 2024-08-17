import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darda1:'#c7a168',
        darda2:'#AF7F43',
        darda3:'#895C33',
        darda4:'#66402D',
        darda5:'#58372B',
        darda6:'#1D1D1B',
        dardaGray1:'#F7F7F6',
        dardaGray2:'#C9C9C6',
        dardaGray3:'#84837D',
        dardaGray4:'#53534e',
        dardaGray5:'#454440',
        dardaGray6:'#32322f',
        dardaGray7:'#242424',
      },
      fontFamily: {
        rem: ['REM', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
