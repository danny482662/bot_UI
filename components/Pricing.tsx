"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import config from "@/config";
import Modal from "@/components/Modal";
import FreeBuyTradeLikeBot from "./FreeBuyTradeLikeBot";
import CreatorDonation from "./CreatorDonation";

const Pricing = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const checkUserAccess = async () => {
    try {
      const response = await fetch('/api/check-access', {
        method: 'POST',
      });
  
      const data = await response.json();
      return data.hasAccess;
    } catch (error) {
      console.error('Error checking user access:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkAccessAndRedirect = async () => {
      const donations = searchParams.get("donations");
      if (!donations) {
        const hasAccess = await checkUserAccess();

        if (hasAccess) {
          router.push('/bot/dashboard');
        } else {
          // Check if the query param exists to show the modal
          if (searchParams.get("showPurchaseModal")) {
            setShowModal(true);
          }

          // Remove the query parameters to prevent infinite redirect loop
          const currentParams = new URLSearchParams(window.location.search);
          if (currentParams.has("showPurchaseModal") || currentParams.has("redirectToCheckout") || currentParams.has("priceId")) {
            currentParams.delete("showPurchaseModal");
            currentParams.delete("redirectToCheckout");
            currentParams.delete("priceId");
            const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
            router.replace(newUrl);
          }
        }
      }
    };

    checkAccessAndRedirect();
  }, [searchParams, router]);

  return (
    <section className="bg-base-200 overflow-hidden" id="pricing">
      <div className={`py-24 px-8 max-w-5xl mx-auto ${showModal ? 'blur-background' : ''}`}>
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="font-bold text-3xl lg:text-5xl tracking-tight text-green-500">
            Start Trading The Smart Way!
          </h2>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {config.stripe.plans.map((plan) => (
            <div key={plan.priceId} className="relative w-full max-w-lg">
              {plan.isFeatured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <span className={`badge text-xs text-success-content font-semibold border-0 bg-green-500`}>
                    SUPPORT MY WORK
                  </span>
                </div>
              )}

              {plan.isFeatured && (
                <div className={`absolute -inset-[1px] rounded-[9px] bg-green-500 z-10`}></div>
              )}

              <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <p className="text-lg lg:text-xl font-bold">{plan.name}</p>
                    {plan.description && (
                      <p className="text-base-content/80 mt-2">
                        {plan.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {plan.priceAnchor && (
                    <div className="flex flex-col justify-end mb-[4px] text-lg ">
                      <p className="relative">
                        <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                        <span className="text-base-content/80">
                          ${plan.priceAnchor}
                        </span>
                      </p>
                    </div>
                  )}
                  <p className={`text-5xl tracking-tight font-extrabold`}>
                    {plan.price} $
                  </p>
                </div>
                {plan.features && (
                  <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-[18px] h-[18px] opacity-80 shrink-0"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div>
                  <div className="space-y-2 flex justify-center items-center">
                    <CreatorDonation priceId={plan.priceId} />
                  </div>
                  <p className="flex items-center pt-2 justify-center gap-2 text-sm text-center text-base-content/80 font-medium relative">
                    Thank you! 🙏
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <span className={`badge text-xs text-success-content font-semibold border-0 bg-green-500`}>
                EARLY BIRD ACCESS
              </span>
            </div>
            <div className={`absolute -inset-[1px] rounded-[9px] bg-green-500 z-10`}></div>
            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10 bg-base-100 p-8 rounded-lg">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="text-lg lg:text-xl font-bold">Long-Term Crypto Bot</p>
                  <p className="text-base-content/80 mt-2">
                    Algo trading bot that utilizing Binance & custom indicators to generate you profit! 💰
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col justify-end mb-[4px] text-lg ">
                  <p className="relative">
                    <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                    <span className="text-base-content/80">
                      $100
                    </span>
                  </p>
                </div>
                <p className={`text-5xl tracking-tight font-extrabold`}>
                  $0
                </p>
                <div className="flex flex-col justify-end mb-[4px]">
                  <p className="text-xs text-base-content/60 uppercase font-semibold">
                    USD
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Platform To Run The Bot 24/7 Without Laptop ON!</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Proven & Tested Crypto Auto Trading Strategy!</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>24/7 Support In Case Of Any Questions / Queries</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Coming Soon: Community Of Like-Minded Individuals here!</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Support For Up To 6 Different Cryptocurrencies</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-[18px] h-[18px] opacity-80 shrink-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Easy, Quick & Seamless Bot Setup!</span>
                </li>
              </ul>
              <div>
                <div className="space-y-2 flex justify-center items-center">
                  <FreeBuyTradeLikeBot />
                </div>
                <p className="flex items-center pt-2 justify-center gap-2 text-sm text-center text-base-content/80 font-medium relative">
                  Don&apos;t Wait. Try It Out Know! 👀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          isModalOpen={showModal}
          setIsModalOpen={setShowModal}
          title="Purchase Required"
          message="You need to purchase the bot to access the dashboard. Please choose a plan and proceed to checkout."
        />
      )}
    </section>
  );
};

export default Pricing;
