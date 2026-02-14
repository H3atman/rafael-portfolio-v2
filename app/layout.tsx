import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { siteConfig, personSchema } from "@/lib/seo-config";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rafael | Operations Business Manager",
    template: "%s | Rafael Portfolio",
  },
  description:
    "Operations Business Manager specializing in System Integration, Business Process Automation, and Data Processing. 6+ years of experience transforming business operations through technology.",
  keywords: [
    "Operations Manager",
    "Business Process Automation",
    "System Integration",
    "Data Processing",
    "Data Analysis",
    "Workflow Automation",
    "Make.com",
    "Zapier",
    "Power BI",
  ],
  authors: [{ name: "Rafael Villanueva" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Rafael | Operations Business Manager",
    description:
      "Specializing in System Integration, Business Process Automation, and Data Processing.",
    siteName: "Rafael Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rafael | Operations Business Manager",
    description:
      "Specializing in System Integration, Business Process Automation, and Data Processing.",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for the website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: personSchema,
  };

  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
