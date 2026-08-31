import { IconType } from "react-icons";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

export interface FooterSection {
  title: string;
  links: string[];
}

export interface SocialLink {
  icon: IconType;
  href: string;
}

export const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "Support", "Privacy", "Terms"],
  },
  {
    title: "More",
    links: ["Docs", "Support", "Privacy", "Terms"],
  },
];

export const socialLinks: SocialLink[] = [
  { icon: FiGithub, href: "#" },
  { icon: FiLinkedin, href: "#" },
  { icon: FiTwitter, href: "#" },
  { icon: FiMail, href: "#" },
];
