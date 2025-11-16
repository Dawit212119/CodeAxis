import './globals.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Cursor3D } from '@/components/ui/cursor-3d'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'CodeAxis | Award-Winning Freelance Marketplace',
  description: 'Connect with world-class freelancers and premium projects. Experience the future of work with our cutting-edge platform designed for excellence.',
  keywords: ['freelance', 'marketplace', 'coding', 'projects', 'talent', 'work', 'developers'],
  authors: [{ name: 'CodeAxis Platform' }],
  openGraph: {
    title: 'CodeAxis | Award-Winning Freelance Marketplace',
    description: 'Connect with world-class freelancers and premium projects. Experience the future of work with our cutting-edge platform designed for excellence.',
    type: 'website',
    url: 'https://codeaxis.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeAxis | Award-Winning Freelance Marketplace',
    description: 'Connect with world-class freelancers and premium projects. Experience the future of work with our cutting-edge platform designed for excellence.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn(
        inter.variable,
        jetbrainsMono.variable,
        'min-h-screen cursor-none font-sans antialiased noise-bg'
      )}>
        <ThemeProvider defaultTheme="dark" storageKey="codeaxis-theme">
          <AuthProvider>
            <Cursor3D />
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}