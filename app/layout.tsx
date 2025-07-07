import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { BackButton } from "@/components/BackButton";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "Nephyy ShareCode - Share, Collaborate, and Review Code",
  description: "The ultimate platform for developers to share code snippets, engage in live coding sessions, and get AI-powered feedback. Built by Nephyy.",
  authors: [{ name: "Nephyy" }],
  keywords: ["code sharing", "live coding, pair programming", "AI code review", "developer tools", "Nephyy"],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e1c" },
  ],
  metadataBase: new URL('https://sharecode.nephyy.tech'),
  openGraph: {
    title: "Nephyy ShareCode",
    description: "Share, Collaborate, and Review Code with AI.",
    url: "https://sharecode.nephyy.tech",
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
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-gray-50/50 dark:bg-background">
            <Header />
            <main className="flex-grow container mx-auto py-6 sm:py-10">
              <BackButton />
              {children}
            </main>
            <Footer />
          </div>
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
