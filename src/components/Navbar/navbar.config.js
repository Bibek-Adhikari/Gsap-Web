import { Github, Linkedin } from 'lucide-react';

export const NAVBAR_HEIGHT = 75;

export const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/Bibek-Adhikari',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/bibek-adhikari-24149b2b3/',
    label: 'LinkedIn',
  },
];
