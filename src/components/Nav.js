import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo - Left side on desktop, center on mobile */}
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <img src={Logo} alt="Little Lemon Logo" className="logo" />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <ul className="desktop-nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#reservations">Reservations</a>
            </li>
            <li>
              <Link to="/order">Order Online</Link>
            </li>
            <li>
              <a href="#login">Login</a>
            </li>
          </ul>
        </nav>

        {/* Right side - Hamburger and Basket */}
        <div className="nav-right">
          <button className="basket-btn" aria-label="Shopping basket">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="basket-count" aria-label="0 items in basket">
              0
            </span>
          </button>

          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className="mobile-nav">
          <ul
            id="main-menu"
            className={`nav-links ${isMenuOpen ? "active" : ""}`}
            role="menu"
          >
            <li role="none">
              <Link to="/" role="menuitem">
                Home
              </Link>
            </li>
            <li role="none">
              <a href="#about" role="menuitem">
                About
              </a>
            </li>
            <li role="none">
              <a href="#menu" role="menuitem">
                Menu
              </a>
            </li>
            <li role="none">
              <a href="#reservations" role="menuitem">
                Reservations
              </a>
            </li>
            <li role="none">
              <Link to="/order" role="menuitem">
                Order Online
              </Link>
            </li>
            <li role="none">
              <a href="#login" role="menuitem">
                Login
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
