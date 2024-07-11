import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { cn, constructMetadata } from '@/lib/utils'
import { SidebarProvider } from '@/context/sidebar-context'
import { ConfettiProvider } from '@/components/providers/confetti-provider'

const font = Open_Sans({ subsets: ['latin'], weight: ['500'] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('antialiased', font.className)}>
        <ClerkProvider>
          <Toaster />
          <ConfettiProvider />
          <SidebarProvider>
            {children}
            <Analytics />
          </SidebarProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
