import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clinic Follow-up Queue — Streamline Client Retention',
  description: 'This app provides wellness clinics with a structured intake, a prioritized follow-up queue, and one-click ROI reports to streamline client retention workflows.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50 antialiased`}>
        <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 text-zinc-100 text-xs px-4 py-2 flex justify-between items-center">
          <span>⚡ Demo Mode — Clinic Follow-up Queue · Built with NEXUS OS</span>
          <a href="/dashboard/queue-dashboard" className="text-white hover:underline">
            Open Dashboard →
          </a>
        </div>
        <div className="pt-9">
          {children}
        </div>
      </body>
    </html>
  )
}