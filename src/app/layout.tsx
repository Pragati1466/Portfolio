import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Pragati | Developer & Data Enthusiast",
  description: "Personal portfolio of Pragati — Developer & Data Enthusiast building data-driven systems and clean user experiences.",
  keywords: ["Pragati", "Portfolio", "Developer", "Data", "React", "Next.js"],
  authors: [{ name: "Pragati" }],
  openGraph: {
    title: "Pragati | Portfolio",
    description: "Developer & Data Enthusiast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
