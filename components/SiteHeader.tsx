import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home', navKey: 'home' },
  {
    href: '/family-practice',
    label: 'Family Practice',
    navKey: 'family-practice',
    menu: [
      { href: '/family-practice', label: 'Family Practice' },
      { href: '/services#primary-care', label: 'Primary Care' },
      { href: '/telehealth', label: 'Telehealth' },
    ],
  },
  {
    href: '/wellness',
    label: 'Wellness',
    navKey: 'wellness',
    menu: [
      { href: '/wellness', label: 'Wellness' },
      { href: '/services#behavioral-services', label: 'Behavioural Services' },
      { href: '/services#chronic-disease-management', label: 'Chronic Disease Management' },
    ],
  },
  { href: '/blog', label: 'Blog', navKey: 'blog' },
  { href: '/about', label: 'About', navKey: 'about' },
  { href: '/contact', label: 'Contact', navKey: 'contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-info-strip" aria-label="Clinic information">
        <a className="header-info-item" href="https://maps.google.com/?q=3002+Myrtle+Ave+N,+Suite+1,+Jacksonville,+FL+32209">3002 Myrtle Ave N, Suite 1, Jacksonville, FL 32209</a>
        <span className="header-info-item">Mon-Fri, 9:00 a.m. - 4:30 p.m.</span>
        <span className="header-info-item"><a href="tel:9042019232">904-201-9232</a><span aria-hidden="true"> · </span><a href="tel:9043741121">904-374-1121</a></span>
      </div>
      <div className="site-header-shell">
        <Link className="brand" href="/" aria-label="Leancare Health & Wellness home">
          <img className="brand-logo" src="https://www.leancarehealth.com/logo.svg" alt="Leancare Health & Wellness" />
        </Link>
        <button className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" data-menu-toggle>
          <span></span><span></span><span></span>
        </button>
        <nav className="site-nav" aria-label="Primary navigation" data-nav>
          {navItems.map((item) => (
            item.menu ? (
              <div className="nav-group" key={item.href}>
                <Link className="nav-group-label" href={item.href} data-nav-link={item.navKey}>{item.label}<span className="nav-chevron" aria-hidden="true"></span></Link>
                <div className="nav-group-menu">
                  {item.menu.map((child) => (
                    <Link key={child.href} href={child.href}>{child.label}</Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} data-nav-link={item.navKey}>{item.label}</Link>
            )
          ))}
        </nav>
        <div className="header-actions">
          <Link className="button button-primary header-cta" href="/contact">Request appointment</Link>
        </div>
      </div>
    </header>
  );
}
