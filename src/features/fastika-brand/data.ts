import {
  Instagram,
  Facebook,
  MessageCircle,
  Globe,
  Music,
  Gem,
  Gift,
  Handshake,
  Sparkles,
  Heart,
  Package,
  Award,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
  username: string;
  hoverColor: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Project {
  title: string;
  description: string;
  category: string;
}

export const brandInfo = {
  name: "فستكا",
  nameAr: "فستكا",
  tagline: "شوكولاتة يمنية فاخرة",
  taglineAr: "شوكولاتة يمنية فاخرة",
  headline: "مُصنوعة بشغف،\nمُصمّمة للتميّز",
  description:
    "نصنع تجارب شوكولاتة حرفية تمزج بين التراث والابتكار. من حبوب الكاكاو المختار يدويًا إلى عروض مذهلة، كل قطعة تروي قصة فخامة من اليمن.",
};

export const services: Service[] = [
  {
    title: "مجموعات حرفية",
    description:
      "علب شوكولاتة منتقاة تضم حبوب كاكاو من مصادر مميزة، ونكهات استوائية، وإصدارات موسمية محدودة.",
    icon: Gem,
  },
  {
    title: "هدايا مخصصة",
    description:
      "ترتيبات شوكولاتة مخصصة للفعاليات المؤسسية، حفلات الزفاف، والاحتفالات الفاخرة.",
    icon: Gift,
  },
  {
    title: "الجملة والشراكات",
    description:
      "شراكات توزيع محلية للمحلات، الكافيهات، وقنوات التجزئة المختارة في محافظة إب واليمن.",
    icon: Handshake,
  },
  {
    title: "تجربة العلامة التجارية",
    description:
      "فعاليات إطلاق علامة تجارية غامرة، تجارب منبثقة، وإنتاج محتوى وسائل التواصل الاجتماعي.",
    icon: Sparkles,
  },
];

export const projects: Project[] = [
  {
    title: "مجموعة رمضان",
    description:
      "علب إصدار محدود بلمسات ورق ذهب عيار 24 قيراط وتغليف بخط عربي فني.",
    category: "موسمي",
  },
  {
    title: "علب هدايا مؤسسية",
    description:
      "مجموعات شوكولاتة فاخرة موسّمة بعلامة تجارية لشركات Fortune 500 والجهات الحكومية في الإمارات.",
    category: "مؤسسات",
  },
  {
    title: "مهرجان شوكولاتة دبي",
    description:
      "عرض حائز جوائز يضم ترافل مميزة وتجارب تذوق تفاعلية.",
    category: "فعاليات",
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "انستقرام",
    url: "https://instagram.com/fastika",
    icon: Instagram,
    username: "@fastika",
    hoverColor: "hover:text-pink-500",
  },
  {
    platform: "تيك توك",
    url: "https://tiktok.com/@fastika",
    icon: Music,
    username: "@fastika",
    hoverColor: "hover:text-rose-500",
  },
  {
    platform: "فيسبوك",
    url: "https://facebook.com/fastika",
    icon: Facebook,
    username: "فستكا",
    hoverColor: "hover:text-blue-500",
  },
  {
    platform: "واتساب",
    url: "https://wa.me/967XXXXXXXX",
    icon: MessageCircle,
    username: "واتساب",
    hoverColor: "hover:text-green-600",
  },
  {
    platform: "الموقع الإلكتروني",
    url: "/",
    icon: Globe,
    username: "fastika.ye",
    hoverColor: "hover:text-brand",
  },
];

export const contactInfo = {
  email: "hello@fastika.ye",
  phone: "+967 XX XXX XXXX",
  whatsapp: "967XXXXXXXX",
  location: "محافظة إب، اليمن",
};

export const stats = [
  { label: "عملاء سعداء", value: "+2,500", icon: Heart },
  { label: "منتجات", value: "٣", icon: Package },
  { label: "جائزة", value: "٨", icon: Award },
] as const;

export const seo = {
  title: "فستكا | شوكولاتة يمنية فاخرة",
  description:
    "فستكا تصنع تجارب شوكولاتة حرفية في اليمن. اكتشف مجموعاتنا، هدايانا المخصصة، وشراكاتنا الفاخرة.",
  ogImage: "/og-fastika.png",
};
