"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthModal from "./AuthModal";

const checkUserAccess = async () => {
  try {
    const response = await fetch('/api/check-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data.hasAccess;
  } catch (error) {
    console.error('Error checking user access:', error);
    return false;
  }
};

const FreeBuyTradeLikeBot = ({
  text = "Get Started",
  extraStyle
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleRedirect = async () => {
      if (status === "authenticated") {
        const hasAccess = await checkUserAccess();
        if (hasAccess) {
          router.push("/bot/dashboard");
        } else {
          await handleFreePayment();
        }
      }
    };

    handleRedirect();
  }, [status]);

  const handleFreePayment = async () => {

    setIsLoading(true);

    try {
      const response = await fetch('/api/add-access', {
        method: 'POST',
      });
  
      const data = await response.json();

      if (data["hasAccess"] === true ) {
        window.location.href = "/bot/dashboard";  
      } else {
        window.location.href = "/";
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    if (status === "authenticated") {
      const hasAccess = await checkUserAccess();
      if (hasAccess) {
        router.push("/bot/dashboard");
      } else {
        await handleFreePayment();
      }
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
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FreeBuyTradeLikeBot;
