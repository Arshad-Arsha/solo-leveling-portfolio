import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const PageLoader = dynamic(() => import("@/components/PageLoader"), { ssr: false });

export const metadata: Metadata = {
  title: "Mohammed Arshad — Frontend Developer",
  description:
    "Frontend developer specializing in React.js, Next.js, Framer Motion, and cinematic interactive experiences. Building premium web experiences that push the boundaries of digital design.",
  keywords: [
    "Mohammed Arshad",
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Framer Motion",
    "Portfolio",
    "UI Engineer",
  ],
  authors: [{ name: "Mohammed Arshad" }],
  openGraph: {
    title: "Mohammed Arshad — Frontend Developer",
    description:
      "Premium frontend developer portfolio with cinematic interactions and scroll storytelling.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Arshad — Frontend Developer",
    description: "Premium frontend developer portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <PageLoader />
        <SmoothScroll />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}

