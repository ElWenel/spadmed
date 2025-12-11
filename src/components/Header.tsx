"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: t("nav.services") },
    { href: "#gallery", label: t("nav.gallery") },
    { href: "#about", label: t("nav.about") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (isHomePage) {
      // Si estamos en la página principal, hacer scroll suave
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Si estamos en otra página, redirigir a home con el hash
      window.location.href = "/" + href;
    }
  };

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 10V30M10 20H30"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className={styles.logoText}>SpaMed</span>
          </Link>

          <nav className={styles.nav}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.langToggle}
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              <span className={language === "es" ? styles.active : ""}>ES</span>
              <span className={styles.divider}>|</span>
              <span className={language === "en" ? styles.active : ""}>EN</span>
            </button>

            <Link href="/cita" className={`btn btn-primary ${styles.ctaBtn}`}>
              {t("nav.appointment")}
            </Link>

            <button
              className={`${styles.menuBtn} ${
                isMobileMenuOpen ? styles.active : ""
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 10V30M10 20H30"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className={styles.logoText}>SpaMed</span>
          </Link>
          <button
            className={styles.closeBtn}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.mobileActions}>
          <button className={styles.mobileLangToggle} onClick={toggleLanguage}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ width: 20, height: 20 }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {language === "es" ? "Español" : "English"}
          </button>
          <Link
            href="/cita"
            className="btn btn-primary"
            style={{ width: "100%" }}
          >
            {t("nav.appointment")}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
