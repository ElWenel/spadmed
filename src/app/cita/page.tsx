"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppointmentForm from "@/components/AppointmentForm";

export default function CitaPage() {
  return (
    <LanguageProvider>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <AppointmentForm />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
