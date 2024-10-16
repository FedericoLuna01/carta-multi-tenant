import Customers from "./_components/customers";
import Features from "./_components/features";
import Hero from "./_components/hero";
import HowItWorks from "./_components/how-it-works";
import Pricing from "./_components/pricing";

export default async function LandingPage() {
  return (
    <main className="space-y-[20vh]">
      <Hero />
      <Features />
      <Pricing />
      <HowItWorks />
      <Customers />
    </main>
  );
}
