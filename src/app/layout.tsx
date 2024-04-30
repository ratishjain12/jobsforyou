import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggleBtn from "@/components/base/ThemeToggleBtn";
import { Navbar } from "@/components/component/navbar";
import Footer from "@/components/component/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Jobs-for-you (Job Board)",
    template: "$s | Jobs-for-you (Job Board)",
  },
  description: "Find your dream job",
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
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <div className="fixed bottom-2 right-2 z-50">
            <ThemeToggleBtn />
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
