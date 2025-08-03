import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { ThemeProvider } from "../../contexts/ThemeContext";
import { Navbar } from "../../components/elements";
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

export default function RootLayout({ children }) {
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
        <div>
          <div className="text-xs bg-gray-300 text-black-700">@21616838</div>

          <ThemeProvider>
            <Navbar />
            {children}
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
