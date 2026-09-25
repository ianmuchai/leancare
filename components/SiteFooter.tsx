import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand" href="/">
          <img className="brand-logo" src="https://www.leancarehealth.com/logo.svg" alt="Leancare Health & Wellness" />
        </Link>
        <p>Bringing wellness, compassion, and integrity in healthcare.</p>
      </div>
      <div>
        <h2>Explore</h2>
        <Link href="/services">Services</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div>
        <h2>Contact</h2>
        <p>3002 Myrtle Ave N, Suite 1<br />Jacksonville, FL 32209</p>
        <p>904-201-9232<br />904-374-1121</p>
      </div>
      <div>
        <h2>Hours</h2>
        <p>Monday-Friday<br />9:00 a.m.-4:30 p.m.</p>
        <p className="disclaimer">For emergencies, call 911.</p>
      </div>
    </footer>
  );
}
