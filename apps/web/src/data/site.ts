import { FacebookFilled, InstagramFilled, WhatsAppOutlined } from "@ant-design/icons";
import { whatsappLink } from "./format";

export const NAV_ITEMS = [
  { to: "/cards", label: "OUR LISTINGS" },
  { to: "/madinaty", label: "MADINATY" },
  { to: "/sokhna", label: "SOKHNA" },
  { to: "/cfc", label: "CAIRO FESTIVAL CITY" },
  { to: "/partner", label: "JOIN OUR HIVE" },
  { to: "/contact-us", label: "CONTACT US" },
];

export const CONTACT = {
  phone: "01299926170",
  phoneHref: "tel:+201299926170",
  email: "info@urban-hive.co",
  address: "Mountain View iCity - New Cairo",
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/share/195sHyD9C5/", icon: FacebookFilled },
  {
    label: "Instagram",
    href: "https://www.instagram.com/uurbanhive?igsh=a3FxNTZ4bnczMnY=",
    icon: InstagramFilled,
  },
  { label: "WhatsApp", href: whatsappLink(), icon: WhatsAppOutlined },
];

export const PARTNER_FORM_URL = "https://forms.gle/vUgRo5f4PqF7GoRAA";
