import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mahjong Calculator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/mahjong.png" />
      </head>
      <body className={inter.className}>
        <Theme radius="large" scaling="95%">
          <NavBar />
          <Container m="5">
            <main>{children}</main>
          </Container>
        </Theme>
        <Analytics />
      </body>
    </html>
  );
}
