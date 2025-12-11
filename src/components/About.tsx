"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./About.module.css";

// SVG Icons for values
const ExcellenceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TrustIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const InnovationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2v1" />
    <path d="M12 6a4 4 0 0 1 4 4c0 2-1.5 3-2 4h-4c-.5-1-2-2-2-4a4 4 0 0 1 4-4z" />
  </svg>
);

const CareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MissionIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const About: React.FC = () => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right"
  );
  const sectionRef = useRef<HTMLElement>(null);

  const valueIcons = [
    <ExcellenceIcon key="ex" />,
    <TrustIcon key="tr" />,
    <InnovationIcon key="in" />,
    <CareIcon key="ca" />,
  ];

  const values = [
    { key: "about.values.excellence" },
    { key: "about.values.trust" },
    { key: "about.values.innovation" },
    { key: "about.values.care" },
  ];

  const doctors = [
    {
      id: 1,
      nameKey: "doctor.1.name",
      specialtyKey: "doctor.1.specialty",
      bioKey: "doctor.1.bio",
      image: "/team/DrCarlosRamirez.png",
    },
    {
      id: 2,
      nameKey: "doctor.2.name",
      specialtyKey: "doctor.2.specialty",
      bioKey: "doctor.2.bio",
      image: "/team/DraMariaGonzalez.png",
    },
    {
      id: 3,
      nameKey: "doctor.3.name",
      specialtyKey: "doctor.3.specialty",
      bioKey: "doctor.3.bio",
      image: "/team/DrRobertoSanchez.png",
    },
    {
      id: 4,
      nameKey: "doctor.4.name",
      specialtyKey: "doctor.4.specialty",
      bioKey: "doctor.4.bio",
      image: "/team/DraAnaMartinez.png",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const changeDoctor = (newIndex: number, direction: "left" | "right") => {
    if (isTransitioning) return;
    setSlideDirection(direction);
    setIsTransitioning(true);

    setTimeout(() => {
      setActiveDoctor(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300);
  };

  const nextDoctor = () => {
    const newIndex = (activeDoctor + 1) % doctors.length;
    changeDoctor(newIndex, "right");
  };

  const prevDoctor = () => {
    const newIndex = (activeDoctor - 1 + doctors.length) % doctors.length;
    changeDoctor(newIndex, "left");
  };

  const goToDoctor = (index: number) => {
    if (index === activeDoctor) return;
    const direction = index > activeDoctor ? "right" : "left";
    changeDoctor(index, direction);
  };

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      {/* Decorative Background */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgShape1}></div>
        <div className={styles.bgShape2}></div>
        <div className={styles.bgShape3}></div>
      </div>

      <div className={styles.container}>
        {/* Mission Section */}
        <div
          className={`${styles.missionSection} ${
            isVisible ? styles.visible : ""
          }`}
        >
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>{t("about.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("about.subtitle")}</p>

            <div className={styles.missionBox}>
              <h3 className={styles.missionTitle}>
                <span className={styles.missionIcon}>
                  <MissionIcon />
                </span>
                {t("about.mission.title")}
              </h3>
              <p className={styles.missionText}>{t("about.mission.text")}</p>
            </div>
          </div>

          <div className={styles.missionImage}>
            <img
              src="/nosotros.jpg"
              alt={
                language === "es"
                  ? "Sobre nosotros - Clínica"
                  : "About us - Clinic"
              }
              className={styles.clinicImage}
            />
            <div className={styles.statsCard}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>
                  {language === "es" ? "Años" : "Years"}
                </span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50+</span>
                <span className={styles.statLabel}>
                  {language === "es" ? "Tratamientos" : "Treatments"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div
          className={`${styles.valuesSection} ${
            isVisible ? styles.visible : ""
          }`}
        >
          <h3 className={styles.valuesTitle}>{t("about.values.title")}</h3>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div
                key={value.key}
                className={styles.valueCard}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <span className={styles.valueIcon}>{valueIcons[index]}</span>
                <span className={styles.valueLabel}>{t(value.key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section - Carousel */}
        <div
          className={`${styles.teamSection} ${isVisible ? styles.visible : ""}`}
        >
          <div className={styles.teamHeader}>
            <h3 className={styles.teamTitle}>{t("about.team.title")}</h3>
            <p className={styles.teamSubtitle}>{t("about.team.subtitle")}</p>
          </div>

          <div className={styles.doctorCarousel}>
            {/* Navigation Left */}
            <button
              className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}
              onClick={prevDoctor}
              aria-label="Previous doctor"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M15 18l-6-6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Doctor Display */}
            <div
              className={`${styles.doctorDisplay} ${
                isTransitioning ? styles.transitioning : ""
              } ${
                slideDirection === "left" ? styles.slideLeft : styles.slideRight
              }`}
            >
              <div className={styles.doctorImageSection}>
                <div className={styles.doctorImageFrame}>
                  <div className={styles.imageDecorSquare}></div>
                  <img
                    src={doctors[activeDoctor].image}
                    alt={t(doctors[activeDoctor].nameKey)}
                    className={styles.doctorMainPhoto}
                    key={activeDoctor}
                  />
                  <div className={styles.imageDecorLine}></div>
                </div>
              </div>

              <div
                className={styles.doctorContentSection}
                key={`content-${activeDoctor}`}
              >
                <div className={styles.quoteIcon}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z" />
                  </svg>
                </div>
                <p className={styles.doctorQuote}>
                  {t(doctors[activeDoctor].bioKey)}
                </p>
                <h4 className={styles.doctorDisplayName}>
                  {t(doctors[activeDoctor].nameKey)}
                </h4>
                <span className={styles.doctorDisplaySpecialty}>
                  {t(doctors[activeDoctor].specialtyKey)}
                </span>

                <a href="#about" className={styles.knowMoreBtn}>
                  {language === "es"
                    ? "Conoce más sobre nosotros"
                    : "Learn more about us"}
                </a>
              </div>
            </div>

            {/* Navigation Right */}
            <button
              className={`${styles.carouselBtn} ${styles.carouselBtnRight}`}
              onClick={nextDoctor}
              aria-label="Next doctor"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M9 18l6-6-6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className={styles.carouselDots}>
            {doctors.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  activeDoctor === index ? styles.dotActive : ""
                }`}
                onClick={() => goToDoctor(index)}
                aria-label={`Go to doctor ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
