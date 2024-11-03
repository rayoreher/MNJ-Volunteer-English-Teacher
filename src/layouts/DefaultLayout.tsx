// components/Layout.tsx
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};