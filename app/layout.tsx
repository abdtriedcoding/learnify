import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { constructMetadata } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          <ConfettiProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
