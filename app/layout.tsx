import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from '@/components/ui/toaster';
import { initializeCollections } from '@/lib/appwrite';

const inter = Inter({ subsets: ['latin'] });

// Initialize Appwrite collections
if (typeof window !== 'undefined') {
  initializeCollections().catch(console.error);
}

export const metadata: Metadata = {
  title: 'BookME - Sign In',
  description: 'Secure login page for BookME application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}