import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "OllamaDiffuser - Local AI Image Generation | Ollama-Style Stable Diffusion Tool",
  description: "OllamaDiffuser: Easy local deployment of Stable Diffusion, FLUX.1, and AI image generation models. Ollama-inspired CLI tool for local SD with web UI, LoRA support, and REST API. Install with pip.",
  keywords: [
    "ollamadiffuser",
    "ollama diffuser", 
    "local stable diffusion",
    "local sd",
    "diffuser",
    "stable diffusion local",
    "AI image generation",
    "FLUX.1",
    "local AI",
    "stable diffusion cli",
    "ollama style",
    "image generation tool",
    "local diffusion models",
    "stable diffusion management",
    "AI art local",
    "diffusion models",
    "local image ai",
    "stable diffusion python",
    "flux diffuser",
    "sd local deployment"
  ],
  authors: [{ name: "OllamaDiffuser Team" }],
  creator: "OllamaDiffuser",
  publisher: "OllamaDiffuser",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "OllamaDiffuser - Local AI Image Generation | Ollama-Style Stable Diffusion",
    description: "Easy local deployment of Stable Diffusion, FLUX.1, and AI image generation models. Ollama-inspired CLI tool with web UI and LoRA support.",
    type: "website",
    url: "https://www.ollamadiffuser.com",
    siteName: "OllamaDiffuser",
    images: [
      {
        url: "https://www.ollamadiffuser.com/ollama-diffuser-logo.svg",
        width: 1024,
        height: 1024,
        alt: "OllamaDiffuser - Local AI Image Generation Tool",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OllamaDiffuser - Local AI Image Generation Tool",
    description: "Easy local deployment of Stable Diffusion, FLUX.1, and AI image generation models. Ollama-inspired CLI tool.",
    images: ["https://www.ollamadiffuser.com/ollama-diffuser-logo.svg"],
    creator: "@ollamadiffuser",
  },
  alternates: {
    canonical: "https://www.ollamadiffuser.com",
  },
  category: "Technology",
  classification: "AI Tools",
  other: {
    "google-site-verification": "your-google-verification-code-here",
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
        <Analytics />
      </body>
    </html>
  );
}
