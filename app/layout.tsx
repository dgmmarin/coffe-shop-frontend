import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './components/footer'
import Navbar2 from './components/navbar2'
import Sidebar from './components/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Navbar2></Navbar2>
          <div className='h-full overflow-hidden bg-white pt-16'>
            <Sidebar></Sidebar>
            <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
            <div id="main-content" className="flex flex-col h-full bg-white overflow-y-auto lg:ml-64">
              <main>
                <div className="pt-6 px-4">
                  {children}
                </div>
              </main>
              <Footer></Footer>
            </div>
          </div>
      </body>
    </html>
  )
}
