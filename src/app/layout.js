import "./globals.css";
import { ToastContainer } from "react-toastify";
import ProviderStore from "@/components/ProviderStore";

export const metadata = {
  title: "Daily Planner",
  description: "Daily Planner",
};

export default function RootLayout({ children }) {
  return (
    <ProviderStore>
      <html lang="es">
        <head>
          {/* <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            crossOrigin="anonymous"
          /> */}
          <script
            src="https://kit.fontawesome.com/48de85dc46.js"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body className="antialiased bg-background h-screen flex flex-col w-full">
          <ToastContainer />
          {children}
        </body>
      </html>
    </ProviderStore>
  );
}
