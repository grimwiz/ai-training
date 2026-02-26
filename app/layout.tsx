import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM Risk Guide for Home Users",
  description: "Simple guides and demos for common LLM mistakes at home."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
      </body>
    </html>
  );
}
