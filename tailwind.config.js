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
        background: "var(--background)",
        foreground: "var(--foreground)",
        neutral: "#111111", // Fondo principal oscuro
        neutralLight: "#F6F6F6", // Fondos de tarjetas y áreas secundarias
        neutralLighter: "#F4F4F4", // Sidebar y secciones de apoyo
        border: "#EAEAEA", // Bordes y líneas separadoras
        muted: "#E5E7EB", // Elementos deshabilitados o secundarios
        sideBar: "#D9D9D9", // Fondo de la barra lateral

        textPrimary: "#FFFFFF", // Texto principal
        textSecondary: "#444444ff", // Texto secundario o deshabilitado
        textContrast: "#111111", // Texto en fondos claros

        primary: "#FDC938", // Amarillo (botón "Get Started", resaltes clave)
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
