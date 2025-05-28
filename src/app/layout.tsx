import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "OllamaDiffuser - Ollama-like Image Generation",
  description: "Simplify local deployment and management of various image generation models (Stable Diffusion and variants). An intuitive tool inspired by Ollama's simplicity.",
  keywords: ["AI", "image generation", "stable diffusion", "FLUX", "ollama", "local deployment"],
  authors: [{ name: "OllamaDiffuser Team" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "OllamaDiffuser - Ollama-like Image Generation",
    description: "Simplify local deployment and management of various image generation models",
    type: "website",
    url: "https://github.com/ollamadiffuser/ollamadiffuser",
    images: [
      {
        url: "/ollama-diffuser-logo.svg",
        width: 1024,
        height: 1024,
        alt: "OllamaDiffuser Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OllamaDiffuser - Ollama-like Image Generation",
    description: "Simplify local deployment and management of various image generation models",
    images: ["/ollama-diffuser-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
