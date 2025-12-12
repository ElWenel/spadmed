"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.services": { es: "Servicios", en: "Services" },
  "nav.gallery": { es: "Galería", en: "Gallery" },
  "nav.about": { es: "Sobre Nosotros", en: "About Us" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "nav.appointment": { es: "Solicitar Cita", en: "Book Appointment" },

  // Hero
  "hero.title": {
    es: "Medical Spa & Laser Center",
    en: "Medical Spa & Laser Center",
  },
  "hero.subtitle": {
    es: "Rejuvenecimiento Facial & Corporal",
    en: "Facial & Body Rejuvenation",
  },
  "hero.description": {
    es: "Descubre el equilibrio perfecto entre ciencia médica y bienestar. Tratamientos personalizados para realzar tu belleza natural.",
    en: "Discover the perfect balance between medical science and wellness. Personalized treatments to enhance your natural beauty.",
  },
  "hero.cta": { es: "Solicitar Cita", en: "Book Appointment" },
  "hero.explore": { es: "Explorar Servicios", en: "Explore Services" },

  // Services
  "services.title": { es: "Nuestros Tratamientos", en: "Our Treatments" },
  "services.subtitle": {
    es: "Ofrecemos una amplia gama de tratamientos estéticos de vanguardia, diseñados para realzar tu belleza natural y bienestar.",
    en: "We offer a wide range of cutting-edge aesthetic treatments designed to enhance your natural beauty and wellness.",
  },
  "services.facial": { es: "Tratamientos Faciales", en: "Facial Treatments" },
  "services.body": { es: "Tratamientos Corporales", en: "Body Treatments" },
  "services.laser": { es: "Tratamientos Láser", en: "Laser Treatments" },
  "services.learnMore": { es: "Conocer Más", en: "Learn More" },
  "services.book": { es: "Reservar", en: "Book Now" },

  // Facial treatments
  "facial.1.title": {
    es: "Limpieza Facial Profunda",
    en: "Deep Facial Cleansing",
  },
  "facial.1.desc": {
    es: "Tratamiento completo de limpieza y purificación para una piel radiante y saludable.",
    en: "Complete cleansing and purification treatment for radiant, healthy skin.",
  },
  "facial.2.title": { es: "Hidratación Intensiva", en: "Intensive Hydration" },
  "facial.2.desc": {
    es: "Restaura la hidratación natural de tu piel con ingredientes de alta calidad.",
    en: "Restore your skin's natural hydration with high-quality ingredients.",
  },
  "facial.3.title": {
    es: "Rejuvenecimiento con Ácido Hialurónico",
    en: "Hyaluronic Acid Rejuvenation",
  },
  "facial.3.desc": {
    es: "Reduce líneas de expresión y devuelve la juventud a tu rostro.",
    en: "Reduce fine lines and restore youth to your face.",
  },

  // Body treatments
  "body.1.title": { es: "Modelado Corporal", en: "Body Contouring" },
  "body.1.desc": {
    es: "Técnicas avanzadas para moldear y tonificar tu figura de manera natural.",
    en: "Advanced techniques to shape and tone your figure naturally.",
  },
  "body.2.title": { es: "Drenaje Linfático", en: "Lymphatic Drainage" },
  "body.2.desc": {
    es: "Elimina toxinas y reduce la retención de líquidos para un cuerpo más ligero.",
    en: "Eliminate toxins and reduce fluid retention for a lighter body.",
  },
  "body.3.title": {
    es: "Tratamiento Anticelulítico",
    en: "Anti-Cellulite Treatment",
  },
  "body.3.desc": {
    es: "Combate la celulitis con tecnología de punta y resultados visibles.",
    en: "Fight cellulite with cutting-edge technology and visible results.",
  },

  // Laser treatments
  "laser.1.title": { es: "Depilación Láser", en: "Laser Hair Removal" },
  "laser.1.desc": {
    es: "Elimina el vello no deseado de forma permanente y segura.",
    en: "Permanently and safely remove unwanted hair.",
  },
  "laser.2.title": { es: "Rejuvenecimiento Láser", en: "Laser Rejuvenation" },
  "laser.2.desc": {
    es: "Estimula la producción de colágeno para una piel más firme y joven.",
    en: "Stimulate collagen production for firmer, younger-looking skin.",
  },
  "laser.3.title": { es: "Eliminación de Manchas", en: "Spot Removal" },
  "laser.3.desc": {
    es: "Tratamiento especializado para eliminar manchas y unificar el tono de piel.",
    en: "Specialized treatment to remove spots and even out skin tone.",
  },

  // Appointment Form
  "appointment.title": { es: "Solicita una Cita", en: "Book an Appointment" },
  "appointment.subtitle": {
    es: "Completa el formulario y nos pondremos en contacto contigo para confirmar tu cita.",
    en: "Fill out the form and we will contact you to confirm your appointment.",
  },
  "appointment.name": { es: "Nombre Completo", en: "Full Name" },
  "appointment.namePlaceholder": { es: "Tu nombre", en: "Your name" },
  "appointment.email": { es: "Correo Electrónico", en: "Email Address" },
  "appointment.emailPlaceholder": { es: "tu@email.com", en: "you@email.com" },
  "appointment.phone": { es: "Teléfono", en: "Phone Number" },
  "appointment.phonePlaceholder": {
    es: "+1 234 567 890",
    en: "+1 234 567 890",
  },
  "appointment.treatment": {
    es: "Tratamiento Deseado",
    en: "Desired Treatment",
  },
  "appointment.treatmentPlaceholder": {
    es: "Selecciona un tratamiento",
    en: "Select a treatment",
  },
  "appointment.date": { es: "Fecha Preferida", en: "Preferred Date" },
  "appointment.message": { es: "Mensaje (Opcional)", en: "Message (Optional)" },
  "appointment.messagePlaceholder": {
    es: "Cuéntanos más sobre lo que necesitas...",
    en: "Tell us more about what you need...",
  },
  "appointment.submit": { es: "Enviar Solicitud", en: "Submit Request" },
  "appointment.success": {
    es: "¡Solicitud enviada con éxito! Te contactaremos pronto.",
    en: "Request sent successfully! We will contact you soon.",
  },

  // Gallery
  "gallery.title": {
    es: "Galería Antes & Después",
    en: "Before & After Gallery",
  },
  "gallery.subtitle": {
    es: "Resultados reales de nuestros pacientes. La transformación habla por sí misma.",
    en: "Real results from our patients. The transformation speaks for itself.",
  },
  "gallery.before": { es: "Antes", en: "Before" },
  "gallery.after": { es: "Después", en: "After" },
  "gallery.close": { es: "Cerrar", en: "Close" },

  // About
  "about.title": { es: "Sobre Nosotros", en: "About Us" },
  "about.subtitle": {
    es: "Más de 15 años de experiencia transformando vidas a través de la medicina estética.",
    en: "Over 15 years of experience transforming lives through aesthetic medicine.",
  },
  "about.mission.title": { es: "Nuestra Misión", en: "Our Mission" },
  "about.mission.text": {
    es: "Proporcionar tratamientos estéticos de la más alta calidad, combinando ciencia médica avanzada con un enfoque personalizado y humano. Nos comprometemos a realzar la belleza natural de cada paciente, respetando su individualidad y bienestar integral.",
    en: "To provide the highest quality aesthetic treatments, combining advanced medical science with a personalized and human approach. We are committed to enhancing the natural beauty of each patient, respecting their individuality and overall well-being.",
  },
  "about.values.title": { es: "Nuestros Valores", en: "Our Values" },
  "about.values.excellence": { es: "Excelencia", en: "Excellence" },
  "about.values.trust": { es: "Confianza", en: "Trust" },
  "about.values.innovation": { es: "Innovación", en: "Innovation" },
  "about.values.care": { es: "Cuidado", en: "Care" },
  "about.team.title": { es: "Nuestro Equipo Médico", en: "Our Medical Team" },
  "about.team.subtitle": {
    es: "Profesionales altamente calificados y comprometidos con tu bienestar.",
    en: "Highly qualified professionals committed to your well-being.",
  },

  // Doctors
  "doctor.1.name": { es: "Dra. María González", en: "Dr. Maria González" },
  "doctor.1.specialty": {
    es: "Directora Médica - Medicina Estética",
    en: "Medical Director - Aesthetic Medicine",
  },
  "doctor.1.bio": {
    es: "Especialista en medicina estética con más de 20 años de experiencia. Pionera en tratamientos de rejuvenecimiento facial no invasivo.",
    en: "Aesthetic medicine specialist with over 20 years of experience. Pioneer in non-invasive facial rejuvenation treatments.",
  },
  "doctor.2.name": { es: "Dr. Carlos Ramírez", en: "Dr. Carlos Ramírez" },
  "doctor.2.specialty": {
    es: "Especialista en Tratamientos Láser",
    en: "Laser Treatment Specialist",
  },
  "doctor.2.bio": {
    es: "Experto en tecnología láser de última generación. Certificado internacionalmente en procedimientos dermatológicos avanzados.",
    en: "Expert in state-of-the-art laser technology. Internationally certified in advanced dermatological procedures.",
  },
  "doctor.3.name": { es: "Dra. Ana Martínez", en: "Dr. Ana Martínez" },
  "doctor.3.specialty": {
    es: "Especialista en Tratamientos Corporales",
    en: "Body Treatment Specialist",
  },
  "doctor.3.bio": {
    es: "Dedicada a los tratamientos corporales y modelado. Formación en las mejores clínicas de Europa y Estados Unidos.",
    en: "Dedicated to body treatments and contouring. Trained at the best clinics in Europe and the United States.",
  },
  "doctor.4.name": { es: "Dr. Roberto Sánchez", en: "Dr. Roberto Sánchez" },
  "doctor.4.specialty": { es: "Cirujano Plástico", en: "Plastic Surgeon" },
  "doctor.4.bio": {
    es: "Cirujano plástico certificado con especialización en procedimientos mínimamente invasivos y resultados naturales.",
    en: "Board-certified plastic surgeon specializing in minimally invasive procedures and natural results.",
  },

  // Testimonials
  "testimonials.title": {
    es: "Lo Que Dicen Nuestros Pacientes",
    en: "What Our Patients Say",
  },
  "testimonials.subtitle": {
    es: "Historias reales de transformación y satisfacción.",
    en: "Real stories of transformation and satisfaction.",
  },

  // Footer
  "footer.contact": { es: "Contacto", en: "Contact" },
  "footer.address": {
    es: "Av. Principal 123, Ciudad",
    en: "123 Main Avenue, City",
  },
  "footer.schedule": { es: "Horario", en: "Schedule" },
  "footer.weekdays": {
    es: "Lunes - Viernes: 9:00 - 20:00",
    en: "Monday - Friday: 9:00 AM - 8:00 PM",
  },
  "footer.saturday": {
    es: "Sábado: 9:00 - 14:00",
    en: "Saturday: 9:00 AM - 2:00 PM",
  },
  "footer.sunday": { es: "Domingo: Cerrado", en: "Sunday: Closed" },
  "footer.links": { es: "Enlaces Útiles", en: "Useful Links" },
  "footer.privacy": { es: "Política de Privacidad", en: "Privacy Policy" },
  "footer.terms": { es: "Términos y Condiciones", en: "Terms and Conditions" },
  "footer.followUs": { es: "Síguenos", en: "Follow Us" },
  "footer.rights": {
    es: "Todos los derechos reservados.",
    en: "All rights reserved.",
  },
  "footer.newsletter": {
    es: "Suscríbete a nuestro boletín",
    en: "Subscribe to our newsletter",
  },
  "footer.newsletterPlaceholder": {
    es: "Tu correo electrónico",
    en: "Your email address",
  },
  "footer.subscribe": { es: "Suscribirse", en: "Subscribe" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Cambiar idioma predeterminado a inglés
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
      return translation[language];
    },
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
