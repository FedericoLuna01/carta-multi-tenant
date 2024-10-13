import Customers from "./_components/customers";
import Features from "./_components/features";
import Hero from "./_components/hero";
import HowItWorks from "./_components/how-it-works";

export default async function LandingPage() {
  return (
    <main className="space-y-[10vh]">
      <Hero />
      <Features />
      <HowItWorks />
      <Customers />
    </main>
  );
}
