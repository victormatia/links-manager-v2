import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import QueryClientProvider from '../context/QueryClientProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const jost = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Schedule Manager | Vitória Maia',
  description: 'A App powered by VITU',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body className={`${jost.className} bg-gradient-green-to-dark w-full h-screen text-white relative`}>
          <QueryClientProvider>
            <Header />
            {children}
            <Footer />
          </QueryClientProvider>
        </body>
    </html>
  )
}
