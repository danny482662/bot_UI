"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ButtonAccount from "./ButtonAccount";
import logo from "@/images/logo.png";
import config from "@/config";
import CreatorDonation from "./CreatorDonation";

const MembersNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const priceId = process.env.NODE_ENV === "development" 
                  ? process.env.NEXT_PUBLIC_STRIPE_CRYPTO_BOT_PRICE_ID_DEV 
                  : process.env.NEXT_PUBLIC_STRIPE_CRYPTO_BOT_PRICE_ID_PROD

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="container flex items-center justify-between px-8 duration-100 ease-in-out pt-8 pb-8 mx-auto" aria-label="Global">
      <div className="flex lg:flex-1">
        <Link href="/" passHref legacyBehavior>
          <a className="flex items-center gap-2 shrink-0" title={`${config.appName} homepage`}>
            <div className="flex items-center">
              <Image
                alt={`${config.appName} logo`}
                src={logo}
                fetchPriority="high"
                width={112}
                height={112}
                decoding="async"
                className="mr-2 w-[112px] sm:w-[112px]"
                style={{ color: 'transparent' }}
              />
              <span className="font-semibold text-white text-[16px] sm:text-[20px]">{config.appName}</span>
            </div>
          </a>
        </Link>
      </div>
      <div className="flex lg:hidden">
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" onClick={toggleMenu}>
          <span className="sr-only">Open main menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-base-content">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div className={`fixed inset-0 z-50 bg-base-100 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:static lg:inset-auto lg:transform-none lg:flex justify-center gap-12 items-center font-semibold text-base`}>
        <div className="flex items-center justify-between px-8 pt-8 lg:hidden">
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center gap-2 shrink-0" title={`${config.appName} homepage`}>
              <div className="flex items-center">
                <Image
                  alt={`${config.appName} logo`}
                  src={logo}
                  fetchPriority="high"
                  width={112}
                  height={112}
                  decoding="async"
                  className="mr-2 w-[112px] sm:w-[112px]"
                  style={{ color: 'transparent' }}
                />
                <span className="font-semibold text-white text-[16px] sm:text-[20px]">{config.appName}</span>
              </div>
            </a>
          </Link>
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5" onClick={toggleMenu}>
            <span className="sr-only">Close main menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-base-content">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-0 lg:flex-1 lg:justify-center">
          <Link href="/#features" passHref legacyBehavior>
            <a className="link no-underline hover:text-slate-100" title="Features" onClick={toggleMenu}>Features</a>
          </Link>
          <Link href="https://konstantinmb.medium.com/" passHref legacyBehavior>
            <a className="link no-underline hover:text-slate-100" title="Blogs" onClick={toggleMenu}>Creator&apos;s Blog</a>
          </Link>
          <CreatorDonation priceId={priceId} text="Donate" extraStyle="btn btn-primary"/>
        </div>
      </div>
      <div className="hidden lg:flex lg:justify-end lg:flex-1">
        <ButtonAccount />
      </div>
    </nav>
  );
};

export default MembersNavbar;
