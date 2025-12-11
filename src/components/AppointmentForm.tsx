"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import styles from "./AppointmentForm.module.css";

const AppointmentForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const treatments = [
    {
      value: "facial-deep",
      label:
        language === "es"
          ? "Limpieza Facial Profunda"
          : "Deep Facial Cleansing",
    },
    {
      value: "facial-hydration",
      label:
        language === "es" ? "Hidratación Intensiva" : "Intensive Hydration",
    },
    {
      value: "facial-hyaluronic",
      label:
        language === "es"
          ? "Rejuvenecimiento con Ácido Hialurónico"
          : "Hyaluronic Acid Rejuvenation",
    },
    {
      value: "body-contouring",
      label: language === "es" ? "Modelado Corporal" : "Body Contouring",
    },
    {
      value: "body-lymphatic",
      label: language === "es" ? "Drenaje Linfático" : "Lymphatic Drainage",
    },
    {
      value: "body-cellulite",
      label:
        language === "es"
          ? "Tratamiento Anticelulítico"
          : "Anti-Cellulite Treatment",
    },
    {
      value: "laser-hair",
      label: language === "es" ? "Depilación Láser" : "Laser Hair Removal",
    },
    {
      value: "laser-rejuvenation",
      label:
        language === "es" ? "Rejuvenecimiento Láser" : "Laser Rejuvenation",
    },
    {
      value: "laser-spots",
      label: language === "es" ? "Eliminación de Manchas" : "Spot Removal",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      (e.target as HTMLFormElement).reset();
    }, 5000);
  };

  return (
    <section id="appointment" className={styles.appointment}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.info}>
            <h2 className={styles.title}>{t("appointment.title")}</h2>
            <p className={styles.subtitle}>{t("appointment.subtitle")}</p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <strong>
                    {language === "es"
                      ? "Agenda Flexible"
                      : "Flexible Schedule"}
                  </strong>
                  <span>
                    {language === "es"
                      ? "Horarios adaptados a ti"
                      : "Hours adapted to you"}
                  </span>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="5" />
                    <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
                    <path d="M16 3l2 2 4-4" />
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <strong>
                    {language === "es"
                      ? "Profesionales Certificados"
                      : "Certified Professionals"}
                  </strong>
                  <span>
                    {language === "es"
                      ? "Equipo médico experto"
                      : "Expert medical team"}
                  </span>
                </div>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className={styles.featureText}>
                  <strong>
                    {language === "es"
                      ? "Tecnología Premium"
                      : "Premium Technology"}
                  </strong>
                  <span>
                    {language === "es"
                      ? "Equipos de última generación"
                      : "State-of-the-art equipment"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formWrapper}>
            {isSubmitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p>{t("appointment.success")}</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {t("appointment.name")}
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder={t("appointment.namePlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {t("appointment.email")}
                    </label>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder={t("appointment.emailPlaceholder")}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {t("appointment.phone")}
                    </label>
                    <input
                      type="tel"
                      className={styles.input}
                      placeholder={t("appointment.phonePlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {t("appointment.treatment")}
                    </label>
                    <select className={styles.select} required>
                      <option value="">
                        {t("appointment.treatmentPlaceholder")}
                      </option>
                      {treatments.map((treatment) => (
                        <option key={treatment.value} value={treatment.value}>
                          {treatment.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>
                      {t("appointment.date")}
                    </label>
                    <input
                      type="date"
                      className={styles.input}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    {t("appointment.message")}
                  </label>
                  <textarea
                    className={styles.textarea}
                    placeholder={t("appointment.messagePlaceholder")}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className={styles.loader}></span>
                  ) : (
                    <>
                      <span>{t("appointment.submit")}</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
