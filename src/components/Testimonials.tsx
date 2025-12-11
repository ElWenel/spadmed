"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Testimonials.module.css";

interface Testimonial {
  id: number;
  name: string;
  treatment: { es: string; en: string };
  comment: { es: string; en: string };
  rating: number;
}

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "María García",
      treatment: { es: "Rejuvenecimiento Facial", en: "Facial Rejuvenation" },
      comment: {
        es: "Increíble experiencia. El equipo es muy profesional y los resultados superaron mis expectativas. Mi piel luce radiante y rejuvenecida.",
        en: "Incredible experience. The team is very professional and the results exceeded my expectations. My skin looks radiant and rejuvenated.",
      },
      rating: 5,
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      treatment: { es: "Depilación Láser", en: "Laser Hair Removal" },
      comment: {
        es: "Después de varias sesiones, los resultados son impresionantes. Muy satisfecho con el tratamiento y la atención recibida.",
        en: "After several sessions, the results are impressive. Very satisfied with the treatment and the attention received.",
      },
      rating: 5,
    },
    {
      id: 3,
      name: "Ana Martínez",
      treatment: { es: "Modelado Corporal", en: "Body Contouring" },
      comment: {
        es: "El mejor centro estético que he visitado. Las instalaciones son modernas y el personal muy amable. Totalmente recomendado.",
        en: "The best aesthetic center I have visited. The facilities are modern and the staff very friendly. Totally recommended.",
      },
      rating: 5,
    },
    {
      id: 4,
      name: "Laura Sánchez",
      treatment: { es: "Hidratación Intensiva", en: "Intensive Hydration" },
      comment: {
        es: "Mi piel nunca había estado tan hidratada y luminosa. El tratamiento fue relajante y los resultados inmediatos.",
        en: "My skin has never been so hydrated and luminous. The treatment was relaxing and the results immediate.",
      },
      rating: 5,
    },
    {
      id: 5,
      name: "Roberto Fernández",
      treatment: { es: "Eliminación de Manchas", en: "Spot Removal" },
      comment: {
        es: "Excelente servicio desde el primer momento. Las manchas han desaparecido casi por completo. Muy agradecido.",
        en: "Excellent service from the first moment. The spots have almost completely disappeared. Very grateful.",
      },
      rating: 5,
    },
  ];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ""}`}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </span>
    ));
  };

  return (
    <section className={styles.testimonials} ref={sectionRef}>
      {/* Decorative Background */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>{t("testimonials.title")}</h2>
          <p className={styles.subtitle}>{t("testimonials.subtitle")}</p>
        </div>

        <div
          className={`${styles.carousel} ${isVisible ? styles.visible : ""}`}
        >
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={prevSlide}
            aria-label="Previous testimonial"
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

          <div className={styles.slidesWrapper}>
            <div
              className={styles.slides}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className={styles.slide}>
                  <div className={styles.testimonialCard}>
                    <div className={styles.quoteIcon}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
                      </svg>
                    </div>
                    <div className={styles.rating}>
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className={styles.comment}>
                      {testimonial.comment[language]}
                    </p>
                    <div className={styles.author}>
                      <div className={styles.avatar}>
                        <span>{testimonial.name.charAt(0)}</span>
                      </div>
                      <div className={styles.authorInfo}>
                        <span className={styles.authorName}>
                          {testimonial.name}
                        </span>
                        <span className={styles.treatment}>
                          {testimonial.treatment[language]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={nextSlide}
            aria-label="Next testimonial"
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

        {/* Dots Navigation */}
        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === activeIndex ? styles.activeDot : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
