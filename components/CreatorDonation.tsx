"use client";

import { useState, useEffect } from "react";
import apiClient from "@/libs/api";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import config from "@/config";
import AuthModal from "./AuthModal";

const CreatorDonation = ({
  text = "Donate",
  extraStyle,
  priceId,
}: {
  text?: string;
  extraStyle?: string;
  priceId: string;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const redirectToCheckout = searchParams.get("redirectToCheckout");
  const savedPriceId = searchParams.get("priceId");
  const successUrl =
    process.env.NODE_ENV === "development"
      ? `http://${config.domainName}/bot/dashboard`
      : `https://${config.domainName}/bot/dashboard`;

  const cancelUrl =
      process.env.NODE_ENV === "development"
        ? `http://${config.domainName}/pricing`
        : `https://${config.domainName}/pricing`;

  useEffect(() => {
    if (status === "authenticated" && redirectToCheckout && savedPriceId) {
      handlePayment("payment", savedPriceId);
    }
  }, [status, redirectToCheckout, savedPriceId]);

  const handlePayment = async (mode: string, priceId: string) => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        "/stripe/create-checkout",
        {
          priceId,
          successUrl: successUrl,
          cancelUrl: cancelUrl,
          mode: mode,
        }
      );

      window.location.href = url;
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    if (status === "authenticated") {
      await handlePayment("payment", priceId);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        className={`btn btn-gradient-green ${extraStyle}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          text
        )}
      </button>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} priceId={priceId} />
    </>
  );
};

export default CreatorDonation;
