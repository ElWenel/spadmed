"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  const { t } = useLanguage();

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
    <section className={styles.hero}>
      {/* Video Background */}
      <div className={styles.videoContainer}>
        <video
          className={styles.videoBackground}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videointro.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
      <div className={styles.decorativeCircle3} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
              <path d="M5 19l1 2 1-2" />
              <path d="M18 19l1 2 1-2" />
            </svg>
          </span>
          <span>Premium Aesthetic Care</span>
        </div>

        <h1 className={styles.title}>{t("hero.title")}</h1>

        <h2 className={styles.subtitle}>{t("hero.subtitle")}</h2>

        <p className={styles.description}>{t("hero.description")}</p>

        <div className={styles.cta}>
          <a
            href="#appointment"
            className={`btn btn-primary ${styles.ctaBtn}`}
            onClick={(e) => scrollToSection(e, "#appointment")}
          >
            <span>{t("hero.cta")}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#services"
            className={`btn btn-outline ${styles.secondaryBtn}`}
            onClick={(e) => scrollToSection(e, "#services")}
          >
            {t("hero.explore")}
          </a>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>15+</span>
            <span className={styles.statLabel}>Años de Experiencia</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>10k+</span>
            <span className={styles.statLabel}>Pacientes Satisfechos</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Tratamientos</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
