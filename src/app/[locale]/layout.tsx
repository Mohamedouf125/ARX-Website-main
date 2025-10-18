import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import FloatingSocialIcons from "@/components/FloatingSocialIcons";
import { ClientToaster } from "@/components/ui/ClientToaster";
import PerformanceOptimizedLayout from "@/components/PerformanceOptimizedLayout";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "ARX Development",
  description:
    "على مدار أكثر من عشرين عامًا رسخت ARX مكانتها كأحد أبرز رواد التطوير العقاري في السوق المصري. بدأت رحلتنا بتوفير حلول سكنية أساسية أسست قاعدة صلبة للانطلاق، لكن التحول الحقيقي جاء مع إدراكنا العميق لاحتياجات السوق وتطلعات العملاء نحو مشروعات أكبر وأكثر شمولية. For over two decades, ARX has established itself as one of the leading names in Egypt's real estate development scene. Our journey began with providing essential housing solutions that laid a solid foundation for growth. However, the real transformation came when we truly understood the market's needs and our clients' aspirations for larger, more integrated projects.",
  keywords:
    "real estate development, Egypt, ARX, residential projects, commercial projects, housing solutions, integrated projects",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://storage.googleapis.com/furniture-hub/arx/settings/Frame%201171276229.ico",
    shortcut:
      "https://storage.googleapis.com/furniture-hub/arx/settings/Frame%201171276229.ico",
    apple:
      "https://storage.googleapis.com/furniture-hub/arx/settings/Frame%201171276229.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <head>
        <script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ARX Development",
              description:
                "على مدار أكثر من عشرين عامًا رسخت ARX مكانتها كأحد أبرز رواد التطوير العقاري في السوق المصري. بدأت رحلتنا بتوفير حلول سكنية أساسية أسست قاعدة صلبة للانطلاق، لكن التحول الحقيقي جاء مع إدراكنا العميق لاحتياجات السوق وتطلعات العملاء نحو مشروعات أكبر وأكثر شمولية. For over two decades, ARX has established itself as one of the leading names in Egypt's real estate development scene. Our journey began with providing essential housing solutions that laid a solid foundation for growth. However, the real transformation came when we truly understood the market's needs and our clients' aspirations for larger, more integrated projects.",
              telephone: "+201001703888",
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "القاهرة الجديدة - شارع 90، مبنى توب 90",
                  addressLocality: "القاهرة الجديدة",
                  addressRegion: "القاهرة",
                  addressCountry: "Egypt",
                  streetAddressEnglish:
                    "New Cairo - 90 Street, Top 90 Building",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "دمياط الجديدة، الحي الثالث، شارع 15",
                  addressLocality: "دمياط الجديدة",
                  addressRegion: "دمياط",
                  postalCode: "34524",
                  addressCountry: "Egypt",
                  streetAddressEnglish:
                    "New Damietta, 3rd District, 15th Street",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress:
                    "برج المنصورة، شارع الجيش - تقاطع شارع الشريف الرضي",
                  addressLocality: "المنصورة",
                  addressRegion: "الدقهلية",
                  addressCountry: "Egypt",
                  streetAddressEnglish:
                    "Mansoura Tower, El Geish St - Intersection with Al Sharif Al Rady St",
                },
              ],
              url: "https://www.arxeg.com/",
              logo: "https://www.arxeg.com/_next/image?url=https%3A%2F%…%2Fsettings%2FARX%2520Logo%2520(1).png&w=128&q=75",
              sameAs: [
                "https://www.facebook.com/Arxeg",
                "https://www.instagram.com/arx_development/",
                "https://www.linkedin.com/company/arxdevelopment/posts/?feedView=all",
              ],
            }),
          }}
        />
        <script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ARX Development",
              url: "https://www.arxeg.com/",
            }),
          }}
        />
        <script
          id="arx-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ARX Development",
              description:
                "على مدار أكثر من عشرين عامًا رسخت ARX مكانتها كأحد أبرز رواد التطوير العقاري في السوق المصري. بدأت رحلتنا بتوفير حلول سكنية أساسية أسست قاعدة صلبة للانطلاق، لكن التحول الحقيقي جاء مع إدراكنا العميق لاحتياجات السوق وتطلعات العملاء نحو مشروعات أكبر وأكثر شمولية. For over two decades, ARX has established itself as one of the leading names in Egypt's real estate development scene. Our journey began with providing essential housing solutions that laid a solid foundation for growth. However, the real transformation came when we truly understood the market's needs and our clients' aspirations for larger, more integrated projects.",
              telephone: "+201001703888",
              address: [
                {
                  "@type": "PostalAddress",
                  streetAddress: "القاهرة الجديدة - شارع 90، مبنى توب 90",
                  addressLocality: "القاهرة الجديدة",
                  addressRegion: "القاهرة",
                  addressCountry: "Egypt",
                  streetAddressEnglish:
                    "New Cairo - 90 Street, Top 90 Building",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress: "دمياط الجديدة، الحي الثالث، شارع 15",
                  addressLocality: "دمياط الجديدة",
                  addressRegion: "دمياط",
                  postalCode: "34524",
                  addressCountry: "Egypt",
                  streetAddressEnglish:
                    "New Damietta, 3rd District, 15th Street",
                },
                {
                  "@type": "PostalAddress",
                  streetAddress:
                    "برج المنصورة، شارع الجيش - تقاطع شارع الشريف الرضي",
                  addressLocality: "المنصورة",
                  addressRegion: "الدقهلية",
                  addressCountry: "Egypt",
                  streetAddressEnglish:
                    "Mansoura Tower, El Geish St - Intersection with Al Sharif Al Rady St",
                },
              ],
              url: "https://www.arxeg.com/",
              logo: "https://www.arxeg.com/_next/image?url=https%3A%2F%…%2Fsettings%2FARX%2520Logo%2520(1).png&w=128&q=75",
              sameAs: "https://www.facebook.com/Arxeg",
            }),
          }}
        />
        <script
          id="arx-website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ARXEG",
              url: "https://www.arxeg.com/",
            }),
          }}
        />
      </head>
      <NextIntlClientProvider locale={locale}>
        <body className="relative">
          <ErrorBoundary>
            <PerformanceOptimizedLayout>
              <Header />
              <main>{children}</main>
              <Footer />
              <FloatingSocialIcons />
              <ClientToaster />
            </PerformanceOptimizedLayout>
          </ErrorBoundary>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
