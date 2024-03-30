import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { constructMetadata } from "@/lib/utils";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

const font = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClerkProvider>
          <Toaster />
          <ConfettiProvider />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
