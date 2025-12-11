"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./Gallery.module.css";

interface GalleryItem {
  id: number;
  treatment: string;
}

const Gallery: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      treatment:
        language === "es" ? "Rejuvenecimiento Facial" : "Facial Rejuvenation",
    },
    {
      id: 2,
      treatment: language === "es" ? "Tratamiento Láser" : "Laser Treatment",
    },
    {
      id: 3,
      treatment: language === "es" ? "Modelado Corporal" : "Body Contouring",
    },
    {
      id: 4,
      treatment: language === "es" ? "Hidratación Profunda" : "Deep Hydration",
    },
    {
      id: 5,
      treatment: language === "es" ? "Eliminación de Manchas" : "Spot Removal",
    },
    {
      id: 6,
      treatment:
        language === "es" ? "Tratamiento Antiedad" : "Anti-Aging Treatment",
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

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className={styles.gallery} ref={sectionRef}>
      {/* Decorative Background */}
      <div className={styles.bgDecoration}>
        <div className={styles.bgCircle1}></div>
        <div className={styles.bgCircle2}></div>
        <div className={styles.bgPattern}></div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>{t("gallery.title")}</h2>
          <p className={styles.subtitle}>{t("gallery.subtitle")}</p>
        </div>

        <div className={styles.grid}>
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.item} ${
                isVisible ? styles.itemVisible : ""
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(item)}
            >
              <div className={styles.comparison}>
                <div className={styles.beforeAfter}>
                  <div className={styles.imagePlaceholder}>
                    <div className={styles.label}>{t("gallery.before")}</div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <div className={styles.imagePlaceholder}>
                    <div className={styles.label}>{t("gallery.after")}</div>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                </div>
                <div className={styles.overlay}>
                  <span className={styles.treatment}>{item.treatment}</span>
                  <button className={styles.viewBtn}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className={`${styles.lightbox} ${selectedImage ? styles.active : ""}`}
          onClick={closeLightbox}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeLightbox}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className={styles.lightboxComparison}>
              <div className={styles.lightboxImage}>
                <div className={styles.lightboxLabel}>
                  {t("gallery.before")}
                </div>
                <div className={styles.lightboxPlaceholder}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              </div>
              <div className={styles.lightboxImage}>
                <div className={styles.lightboxLabel}>{t("gallery.after")}</div>
                <div className={styles.lightboxPlaceholder}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              </div>
            </div>
            <p className={styles.lightboxTreatment}>
              {selectedImage.treatment}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
