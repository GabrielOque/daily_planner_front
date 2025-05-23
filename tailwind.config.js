/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        foreground: "var(--foreground)",
        neutral: "#111111", // Fondo principal oscuro
        neutralLight: "#F6F6F6", // Fondos de tarjetas y áreas secundarias
        neutralLighter: "#FAFAFA", // Sidebar y secciones de apoyo
        border: "#EBEBEB", // Bordes y líneas separadoras
        muted: "#7C7C7C", // Elementos deshabilitados o secundarios
        sideBar: "#F4F4F4", // Fondo de la barra lateral

        textPrimary: "#FFFFFF", // Texto principal
        textSecondary: "#444444ff", // Texto secundario o deshabilitado
        textContrast: "#212529", // Texto en fondos claros

        primary: "#FFD43B", // Amarillo (botón "Get Started", resaltes clave)
        primaryDark: "#D9A600", // Amarillo más oscuro para hover

        accentRed: "#FC5C45", // Rojo para alertas o tags destacados
        accentBlue: "#91D8E4", // Azul claro para calendario o info secundaria
        accentYellow: "#FFD166", // Amarillo complementario

        tagSuccess: "#B2F5EA", // Verde agua para tareas completadas o positivas
        tagWarning: "#FECACA", // Rojo suave para alertas o tareas pendientes
      },
    },
  },
  plugins: [],
};
