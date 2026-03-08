import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* Font for the entire app */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Title and Description for the entire app */
export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App",
};

/** 
 * Root Layout: 
 * > This is the main layout for the entire app 
 * > It wraps all child 'pages' inside some logic (like a wrapper) along
 *   with some common UI (like a header, footer, etc.).
 * > It is a good place to put things like:
 *   - Global CSS, Fonts, Meta Tags, Scripts, Styles, Components, etc.
 * */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
