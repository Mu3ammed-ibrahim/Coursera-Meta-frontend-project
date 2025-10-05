function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <section className="brand-info">
          <h3>Little Lemon</h3>
          <p>Chicago</p>
        </section>
        <nav className="footer-nav" aria-label="Footer Navigation">
          <h3>Navigation</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </nav>
        <section className="contact-info">
          <h3>Contact</h3>
          <address>
            <p>
              Email:{" "}
              <a href="mailto:info@littlelemon.com">info@littlelemon.com</a>
            </p>
            <p>
              Phone: <a href="tel:+15555555555">(555) 555-5555</a>
            </p>
          </address>
        </section>
        <section className="social-media">
          <h3>Social Media</h3>
          <ul className="social-links">
            <li>
              <a
                href="https://instagram.com/littlelemon"
                aria-label="Visit our Instagram"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/littlelemon"
                aria-label="Visit our Facebook"
              >
                Facebook
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
