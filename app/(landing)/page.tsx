import WhatsAppButton from "@/components/whatsapp-button";
import Contact from "./_components/contact";
import Faq from "./_components/faq";
import Features from "./_components/features";
import Hero from "./_components/hero";
import Pricing from "./_components/pricing";

export default async function LandingPage() {
  return (
    <main className="space-y-[20vh]">
      <Hero />
      <Features />
      <Pricing />
      <Faq />
      <Contact />
      <WhatsAppButton number="3413125385" message="hola" />
    </main>
  );
}
