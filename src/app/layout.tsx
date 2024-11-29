import { generateMetadata } from './metadata';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import Sidebar from '@/components/Sidebar';
import ClientLayout from '@/components/ClientLayout';
import './globals.css';

export const metadata = generateMetadata('home');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <MobileMenu />
        <ClientLayout>
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
