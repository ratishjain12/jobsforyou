import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggleBtn from "@/components/base/ThemeToggleBtn";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jobs-for-you (Job Board)",
  description: "Developed by ratish jain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-2 right-2 z-50">
            <ThemeToggleBtn />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
