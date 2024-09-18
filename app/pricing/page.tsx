import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { Suspense } from "react";

const PricingPage = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Pricing />
      </Suspense>
    </div>
  );
};

export default PricingPage;
