import type { Metadata } from "next";
import { PageTransition } from "@/shared/ui/page-transition";
import { seo } from "@/features/fastika-brand";
import { DigitalCard } from "@/features/fastika-brand";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    type: "website",
    locale: "ar_AE",
  },
};

export default function FastikaPage() {
  return (
    <PageTransition>
      <div dir="rtl" lang="ar" className="min-h-screen bg-[#180C07]">
        <DigitalCard />
      </div>
    </PageTransition>
  );
}
