import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
  title: {
    default: 'Sapore Di Mare — Michelin-starred Italian Seafood, Mayfair',
    template: '%s | Sapore Di Mare',
  },
  description: 'A Michelin-starred Italian seafood restaurant in the heart of Mayfair, London.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-noir text-cream font-body">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}