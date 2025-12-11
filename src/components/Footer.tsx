"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section */}
        <div className={styles.topSection}>
          <div className={styles.brandSection}>
            <a href="#" className={styles.logo}>
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
            </a>
            <p className={styles.brandDescription}>
              {language === "es"
                ? "Tu destino para el rejuvenecimiento y bienestar. Combinamos ciencia médica avanzada con cuidado personalizado."
                : "Your destination for rejuvenation and wellness. We combine advanced medical science with personalized care."}
            </p>

            {/* Newsletter */}
            <div className={styles.newsletter}>
              <h4 className={styles.newsletterTitle}>
                {t("footer.newsletter")}
              </h4>
              <form
                onSubmit={handleSubscribe}
                className={styles.newsletterForm}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletterPlaceholder")}
                  className={styles.newsletterInput}
                  required
                />
                <button type="submit" className={styles.newsletterBtn}>
                  {isSubscribed ? "✓" : t("footer.subscribe")}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t("footer.contact")}</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t("footer.address")}</span>
              </li>
              <li className={styles.contactItem}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className={styles.contactItem}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                <span>info@spamed.com</span>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t("footer.schedule")}</h4>
            <ul className={styles.scheduleList}>
              <li>{t("footer.weekdays")}</li>
              <li>{t("footer.saturday")}</li>
              <li>{t("footer.sunday")}</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>{t("footer.links")}</h4>
            <ul className={styles.linksList}>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, "#services")}
                >
                  {t("nav.services")}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => scrollToSection(e, "#gallery")}
                >
                  {t("nav.gallery")}
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, "#about")}>
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a
                  href="#appointment"
                  onClick={(e) => scrollToSection(e, "#appointment")}
                >
                  {t("nav.appointment")}
                </a>
              </li>
              <li>
                <a href="#">{t("footer.privacy")}</a>
              </li>
              <li>
                <a href="#">{t("footer.terms")}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.socialSection}>
          <h4 className={styles.socialTitle}>{t("footer.followUs")}</h4>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="18" cy="6" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" />
                <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" fill="white" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} SpaMed. {t("footer.rights")}
          </p>
          <p className={styles.madeWith}>
            {language === "es" ? "Hecho con" : "Made with"} ❤️{" "}
            {language === "es" ? "para tu bienestar" : "for your wellness"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
