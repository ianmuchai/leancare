import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/family-practice', label: 'Family Practice' },
  { href: '/wellness', label: 'Wellness' },
  { href: '/telehealth', label: 'Telehealth' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Leancare Health & Wellness home">
        <img className="brand-logo" src="https://www.leancarehealth.com/logo.svg" alt="Leancare Health & Wellness" />
      </Link>
      <button className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>{item.label}</Link>
        ))}
      </nav>
      <a className="phone-link" href="tel:9042019232">904-201-9232</a>
      <Link className="button button-primary header-cta" href="/contact">Request appointment</Link>
    </header>
  );
}
