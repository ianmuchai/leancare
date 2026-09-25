import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home', navKey: 'home' },
  { href: '/services', label: 'Services', navKey: 'services' },
  { href: '/family-practice', label: 'Family Practice', navKey: 'family-practice' },
  { href: '/wellness', label: 'Wellness', navKey: 'wellness' },
  { href: '/telehealth', label: 'Telehealth', navKey: 'telehealth' },
  { href: '/about', label: 'About', navKey: 'about' },
  { href: '/contact', label: 'Contact', navKey: 'contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Leancare Health & Wellness home">
        <img className="brand-logo" src="https://www.leancarehealth.com/logo.svg" alt="Leancare Health & Wellness" />
      </Link>
      <button className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" data-menu-toggle>
        <span></span><span></span><span></span>
      </button>
      <nav className="site-nav" aria-label="Primary navigation" data-nav>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} data-nav-link={item.navKey}>{item.label}</Link>
        ))}
      </nav>
      <a className="phone-link" href="tel:9042019232">904-201-9232</a>
      <Link className="button button-primary header-cta" href="/contact">Request appointment</Link>
    </header>
  );
}
