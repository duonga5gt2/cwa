import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "../../contexts/ThemeContext";
import Navbar from "../../components/elements/Navbar";
import Footer from "../../components/elements/Footer";
import { HomeProvider } from "../../contexts/HomeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CWA Project",
  description: "Built for a university class",
};

export default function RootLayout( {
  children,
}: {
  children: React.ReactNode;   // <-- add this
} ) {
  return (
    <html lang="en">
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          "antialiased transition-colors duration-300",
          "bg-white text-black dark:bg-zinc-900 dark:text-white"
        )}
      >
        <ThemeProvider>
          <header>
            <Navbar />

            <hr style={{ border: 0, borderTop: "2px solid #222", margin: 0 }} />
          </header>
          <HomeProvider>
            <main style={{ paddingTop: 80 }}>{children}</main>
          </HomeProvider>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
