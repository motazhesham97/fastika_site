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
  name: "فستيكا",
  nameAr: "فستيكا",
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
    url: "https://www.instagram.com/fastika_choco?igsh=ODZwa25teHh2aWZq",
    icon: Instagram,
    username: "@fastika_choco",
    hoverColor: "hover:text-pink-500",
  },
  {
    platform: "تيك توك",
    url: "https://www.tiktok.com/@fastika_choco?_r=1&_t=ZS-96t0VR7SD80",
    icon: Music,
    username: "@fastika_choco",
    hoverColor: "hover:text-rose-500",
  },
  {
    platform: "فيسبوك",
    url: "https://www.facebook.com/share/1E5d15HTJu/",
    icon: Facebook,
    username: "فستيكا",
    hoverColor: "hover:text-blue-500",
  },
  {
    platform: "واتساب",
    url: "https://wa.me/message/QL6VTS4VOGA3A1",
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
  phone: "+967 771378814",
  whatsapp: "message/QL6VTS4VOGA3A1",
  location: "محافظة إب، اليمن",
};

export const stats = [
  { label: "عملاء سعداء", value: "+2,500", icon: Heart },
  { label: "منتجات", value: "٣", icon: Package },
  { label: "جائزة", value: "٨", icon: Award },
] as const;

export const seo = {
  title: "فستيكا | شوكولاتة يمنية فاخرة",
  description:
    "فستيكا تصنع تجارب شوكولاتة حرفية في اليمن. اكتشف مجموعاتنا، هدايانا المخصصة، وشراكاتنا الفاخرة.",
  ogImage: "/og-fastika.png",
};
