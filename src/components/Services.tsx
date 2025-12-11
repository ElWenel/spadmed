"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Services.module.css";

interface Treatment {
  id: string;
  titleKey: string;
  descKey: string;
  image: string;
}

// SVG Icons for categories
const FacialIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="5" />
    <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
    <path d="M9 8h.01M15 8h.01" />
    <path d="M10 11a2 2 0 0 0 4 0" />
  </svg>
);

const BodyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
    <path d="M12 10v11" />
    <path d="M8 14l4 4 4-4" />
  </svg>
);

const LaserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const Services: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<
    "facial" | "body" | "laser"
  >("facial");
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const sectionRef = useRef<HTMLElement>(null);

  const categoryIcons = {
    facial: <FacialIcon />,
    body: <BodyIcon />,
    laser: <LaserIcon />,
  };

  const categories = [
    { id: "facial", labelKey: "services.facial" },
    { id: "body", labelKey: "services.body" },
    { id: "laser", labelKey: "services.laser" },
  ] as const;

  const treatments: Record<string, Treatment[]> = {
    facial: [
      {
        id: "facial1",
        titleKey: "facial.1.title",
        descKey: "facial.1.desc",
        image: "/treatments/limpieza_facial.jpeg",
      },
      {
        id: "facial2",
        titleKey: "facial.2.title",
        descKey: "facial.2.desc",
        image: "/treatments/hidratacion_intensiva.jpeg",
      },
      {
        id: "facial3",
        titleKey: "facial.3.title",
        descKey: "facial.3.desc",
        image: "/treatments/rejuvenecimiento_acido_hialuronico.jpeg",
      },
    ],
    body: [
      {
        id: "body1",
        titleKey: "body.1.title",
        descKey: "body.1.desc",
        image: "/treatments/modelado_corporal.jpeg",
      },
      {
        id: "body2",
        titleKey: "body.2.title",
        descKey: "body.2.desc",
        image: "/treatments/tratamiento_anticelulitico.jpeg",
      },
      {
        id: "body3",
        titleKey: "body.3.title",
        descKey: "body.3.desc",
        image: "/treatments/denaje_linfatico.jpeg",
      },
    ],
    laser: [
      {
        id: "laser1",
        titleKey: "laser.1.title",
        descKey: "laser.1.desc",
        image: "/treatments/depilacion_laser.jpeg",
      },
      {
        id: "laser2",
        titleKey: "laser.2.title",
        descKey: "laser.2.desc",
        image: "/treatments/rejuvenecimiento_laser.jpeg",
      },
      {
        id: "laser3",
        titleKey: "laser.3.title",
        descKey: "laser.3.desc",
        image: "/treatments/eliminacion_manchas.jpeg",
      },
    ],
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Reset and animate cards when category changes
    setVisibleCards([false, false, false]);
    const timers = treatments[activeCategory].map((_, index) => {
      return setTimeout(() => {
        setVisibleCards((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 150 * (index + 1));
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [activeCategory]);

  return (
    <section id="services" className={styles.services} ref={sectionRef}>
      {/* Decorative Background */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgCircle3}></div>
        <div className={styles.bgPattern}></div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>{t("services.title")}</h2>
          <p className={styles.subtitle}>{t("services.subtitle")}</p>
        </div>

        {/* Category Tabs */}
        <div className={`${styles.tabs} ${isVisible ? styles.visible : ""}`}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.tab} ${
                activeCategory === category.id ? styles.active : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className={styles.tabIcon}>
                {categoryIcons[category.id]}
              </span>
              <span>{t(category.labelKey)}</span>
            </button>
          ))}
        </div>

        {/* Treatment Cards */}
        <div className={styles.grid}>
          {treatments[activeCategory].map((treatment, index) => (
            <div
              key={treatment.id}
              className={`${styles.card} ${
                visibleCards[index] ? styles.cardVisible : ""
              }`}
            >
              <div className={styles.cardImage}>
                <img
                  src={treatment.image}
                  alt={t(treatment.titleKey)}
                  className={styles.treatmentImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{t(treatment.titleKey)}</h3>
                <p className={styles.cardDescription}>{t(treatment.descKey)}</p>
                <div className={styles.cardActions}>
                  <button className={`btn btn-secondary ${styles.cardBtn}`}>
                    {t("services.learnMore")}
                  </button>
                  <Link
                    href="/cita"
                    className={`btn btn-primary ${styles.cardBtn}`}
                  >
                    {t("services.book")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
