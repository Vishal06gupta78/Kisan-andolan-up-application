import type { Metadata } from 'next';
import { Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-hindi',
});

export const metadata: Metadata = {
  title: 'किसान आंदोलन उत्तर प्रदेश | अजय अनमोल - अध्यक्ष',
  description: 'किसान आंदोलन उत्तर प्रदेश की आधिकारिक वेबसाइट। अध्यक्ष अजय अनमोल के नेतृत्व में किसानों के अधिकारों के लिए संघर्ष।',
  keywords: 'किसान आंदोलन, उत्तर प्रदेश, अजय अनमोल, किसान नेता, farmer movement, UP farmers',
  authors: [{ name: 'Kisan Andolan UP' }],
  openGraph: {
    title: 'किसान आंदोलन उत्तर प्रदेश',
    description: 'किसानों के अधिकारों के लिए संघर्षरत आंदोलन',
    type: 'website',
    locale: 'hi_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'किसान आंदोलन उत्तर प्रदेश',
    description: 'किसानों के अधिकारों के लिए संघर्षरत आंदोलन',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://kisanandolanup.org',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className={notoSansDevanagari.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#166534" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-hindi antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#166534',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}
