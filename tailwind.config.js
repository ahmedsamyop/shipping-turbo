/** @type {import('tailwindcss').Config} */
// import colors from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBgColor: "#06232f",
        mainColor: "#38b6ff",
        hoverColor: "#00000033",
        menuColor: "#000000cc",
        receivColor: "#43A047",
        notReceivColor: "#FF5722",
        cancelColor: "#ff0000",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
