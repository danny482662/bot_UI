"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Crisp } from "crisp-sdk-web";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";
import config from "@/config";
import ButtonSupport from "./ButtonSupport";

const CrispChat = (): null => {
  const pathname = usePathname();
  const { data } = useSession();

  useEffect(() => {
    if (config?.crisp?.id) {
      
      Crisp.configure(config.crisp.id);
      <ButtonSupport />
    }
  }, [pathname]);

  useEffect(() => {
    if (data?.user && config?.crisp?.id) {
      Crisp.session.setData({ userId: data.user?.id });
    }
  }, [data]);

  return null;
};

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <NextTopLoader color={config.colors.main} showSpinner={false} />

        {children}

        <Toaster
          toastOptions={{
            duration: 3000,
          }}
        />

        <Tooltip
          id="tooltip"
          className="z-[60] !opacity-100 max-w-sm shadow-lg"
        />

        <CrispChat />
      </SessionProvider>
    </>
  );
};

export default ClientLayout;
