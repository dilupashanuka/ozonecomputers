import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-heading' });

export const metadata: Metadata = {
  title: {
    template: '%s | OZONE LABS',
    default: 'OZONE LABS | ELITE TECH ARCHITECTURE',
  },
  description: "Your elite destination for high-impact gaming architecture, precision workstations, and mission-critical tech in Sri Lanka. Operational across Deiyandara, Kamburupitiya, and Embilipitiya.",
  keywords: "Ozone Labs, Ozone Computers, computer shop Sri Lanka, gaming PCs, custom builds, tech retail, high-end workstations",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'OZONE LABS',
    description: 'ELITE TECH ARCHITECTURE across Sri Lanka.',
    type: 'website',
    locale: 'en_US',
    siteName: 'OZONE LABS',
  },
};

import { createClient } from "@/utils/supabase/server";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').single();

  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";
  const isAdminPage = pathname.includes("/tarusha/dashboard") || pathname.includes("/tharusha/dashboard");

  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-[#050811] text-foreground`} suppressHydrationWarning>
        {!isAdminPage && <Navbar settings={settings} />}
        <main className="flex-1">
          {children}
        </main>
        {!isAdminPage && <Footer settings={settings} />}
        {!isAdminPage && <MobileBottomNav settings={settings} />}
        {!isAdminPage && <WhatsAppButton settings={settings} />}
        <Toaster />
      </body>
    </html>
  );
}
