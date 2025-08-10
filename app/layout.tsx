import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "sonner";
import Footer from "./_components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wireframeToCode",
  description: "Developed by empsloc",
};

const Outift1 = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${Outift1.className} flex flex-col `}>
        <Provider>
          <div className="flex flex-col w-full min-h-screen justify-between">
            <main className="flex-grow ">{children}</main>
            <Toaster />

            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
