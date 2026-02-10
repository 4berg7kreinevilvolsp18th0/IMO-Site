import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';
import { Ubuntu } from 'next/font/google';

const ubuntu = Ubuntu({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-ubuntu',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://imo-site.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'ИМО ДВФУ — Институт Мирового Океана',
    template: '%s | ИМО ДВФУ',
  },
  description:
    'Официальный сайт Института Мирового Океана ДВФУ. Программы бакалавриата и магистратуры, новости, экспедиции, стипендии.',
  keywords: [
    'Институт Мирового Океана',
    'ИМО',
    'ДВФУ',
    'океанология',
    'биология',
    'экология',
    'мехатроника',
    'остров Русский',
    'Владивосток',
    'бакалавриат',
    'магистратура',
  ],
  authors: [{ name: 'ИМО ДВФУ' }],
  creator: 'ИМО ДВФУ',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'ИМО ДВФУ',
    title: 'ИМО ДВФУ — Институт Мирового Океана',
    description: 'Программы бакалавриата и магистратуры, экспедиции, стипендии и жизнь в кампусе на острове Русский.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ИМО ДВФУ — Институт Мирового Океана',
    description: 'Программы, экспедиции и стипендии Института Мирового Океана ДВФУ.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={ubuntu.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Nasalization — заголовочный шрифт брендбука ИМО (CDN Fonts) */}
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/nasalization-2"
        />
      </head>
      <body className={`bg-imo-deep text-white antialiased font-body ${ubuntu.variable}`}>
        <a href="#main-content" className="skip-to-content">
          Перейти к содержимому
        </a>
        <Header />
        <div id="main-content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
