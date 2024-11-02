import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Chatbot | Neon x Aceternity template",
  description:
    "Experience the future of conversational AI with our Neon x Aceternity Chatbot template. Seamlessly blending cutting-edge technology with sleek design, this template offers a powerful foundation for building intelligent, responsive chatbots powered by neon.tech's serverless Postgres.",
  openGraph: {
    title: "Chatbot | Neon x Aceternity template",
    description:
      "Experience the future of conversational AI with our Neon x Aceternity Chatbot template. Seamlessly blending cutting-edge technology with sleek design, this template offers a powerful foundation for building intelligent, responsive chatbots powered by neon.tech's serverless Postgres.",
    images: ["https://neon-chatbot.vercel.app/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
