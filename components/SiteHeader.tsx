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

function InfoIcon({ type }: { type: 'location' | 'clock' | 'phone' }) {
  const paths = {
    location: (
      <>
        <path d="M12 21s6-5.3 6-11a6 6 0 0 0-12 0c0 5.7 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2.2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7.8v4.7l3.1 1.9" />
      </>
    ),
    phone: (
      <path d="M6.6 5.2 9 4.7l2 4.2-1.5 1.1c.9 1.8 2.4 3.3 4.3 4.2l1.1-1.5 4.2 2-.5 2.4c-.2.9-1 1.5-1.9 1.4C10.7 18 6 13.3 5.2 7.1c-.1-.9.5-1.7 1.4-1.9Z" />
    ),
  };

  return (
    <span className={`info-icon info-icon-${type}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img" focusable="false">{paths[type]}</svg>
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-info-strip" aria-label="Clinic information">
        <a className="header-info-item" href="https://maps.google.com/?q=3002+Myrtle+Ave+N,+Suite+1,+Jacksonville,+FL+32209"><InfoIcon type="location" /><span>3002 Myrtle Ave N, Suite 1, Jacksonville, FL 32209</span></a>
        <span className="header-info-item"><InfoIcon type="clock" /><span>Mon-Fri, 9:00 a.m. - 4:30 p.m.</span></span>
        <span className="header-info-item"><InfoIcon type="phone" /><span><a href="tel:9042019232">904-201-9232</a><span aria-hidden="true"> · </span><a href="tel:9043741121">904-374-1121</a></span></span>
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


