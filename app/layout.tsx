import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ScribbleSense - AI-Powered Learning Platform',
  description: 'Transform your handwriting and speech into powerful learning experiences with AI-driven grammar correction, OCR, and educational resources.',
  keywords: ['education', 'AI', 'handwriting', 'OCR', 'speech-to-text', 'grammar', 'learning'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
