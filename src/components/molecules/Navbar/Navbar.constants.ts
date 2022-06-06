import { NavbarLink } from './Navbar.interfaces';
export const DEFAULT_BRAND = {
   src: 'logo',
   href: '/',
};

export const DEFAULT_LINKS: NavbarLink[] = [
   { text: 'Personagens', href: '/personagens' },
   { text: 'Lugares Famosos', href: '/locations' },
   { text: 'Episódios', href: '/episodes' },
];
