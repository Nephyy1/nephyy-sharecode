import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Nephyy ShareCode - Share, Collaborate, and Review Code",
  description: "The ultimate platform for developers to share code snippets, engage in live coding sessions, and get AI-powered feedback. Built by Nephyy.",
  authors: [{ name: "Nephyy" }],
  keywords: ["code sharing", "live coding", "pair programming", "AI code review", "developer tools", "Nephyy"],
  metadataBase: new URL('https://your-production-url.com'),
  openGraph: {
    title: "Nephyy ShareCode",
    description: "Share, Collaborate, and Review Code with AI.",
    url: "https://your-production-url.com",
    siteName: "Nephyy ShareCode",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nephyy ShareCode",
    description: "Share, Collaborate, and Review Code with AI.",
    creator: "@yourtwitterhandle",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <div className="flex flex-col min-h-screen bg-gray-50/50">
          <Header />
          <main className="flex-grow container mx-auto py-6 sm:py-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
