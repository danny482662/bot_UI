import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import BigStatementHero from "@/components/BigStatementHero";
import MainHero from "@/components/MainHero";
import CreatorIntro from "@/components/CreatorIntro";


export default function Home() {
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      <main>
        <MainHero />
        <Problem />
        <BigStatementHero />
        <FeaturesAccordion />
        <CTA />
        <CreatorIntro />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}