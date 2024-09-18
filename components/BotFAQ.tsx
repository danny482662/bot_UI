"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

interface BotFAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: BotFAQItemProps[] = [
  {
    question: "Is the bot connected to my Binance account?",
    answer: (
      <p>
        Yes, the bot is indeed connected to your Binance account. That&apos;s done through the API_KEY/API_SECRET you need to provide. 
        Read next question to learn how to obtain them 👇
      </p>
    ),
  },
  {
    question: "How to get the API_KEY & API_SECRET required to run the bot?",
    answer: (
      <p>
        Simply click on the &apos;Get API Key & Secret&apos; button at the top. 
        You will find a detailed documentation by Binance on how to get them from their portal!
      </p>
    ),
  },
  {
    question: "With which cryptos does the bot perform the best?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        The bot is designed to work best with the bigger crypto pairs like BTCUSDT / ETHUSDT / SOLUSDT / MATICUSDT on the SPOT market! 
        Using the bot for trading meme and lower cap coins is risky and should be done with a lot of cautions as the strategy was designed for bigger coins!
        Of course, more risk = bigger wins, but also more risk = bigger loses!
      </div>
    ),
  },
  {
    question: "Is the bot working with leverage?",
    answer: (
      <p>
        No, the bot is designed and confgiured to run on the SPOT Crypto Market only, at the moment! 
        We are working on different bots for the Futures Crypto Market!
      </p>
    ),
  },
  {
    question: "Do I need a Binance Account to use the bot?",
    answer: 
      <div className="space-y-2 leading-relaxed">
        Yes, you do need a Binance trading account! The bot is configured to work only with the Binance Exchange. 
      </div>,
  },
  {
    question: "Is the trading bot running even when I am offline?",
    answer: (
      <p>
        Yes! The bot will run until you stop it via clicking on the `Stop` button, no matter on or off line!
      </p>
    ),
  },
  {
    question: "Is there a limit on how much $ I can put in?",
    answer: (
      <p>
        No, but since we are trading, put in as much as you&apos;re willing to lose! Although algorithmic, there is a risk of losing money!
      </p>
    ),
  },

];

const BotFaqItem = ({ item }: { item: BotFAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-success" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const BotFAQ = () => {
  return (
    <section className="bg-base-200" id="bot-faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="text-2xl inline-block font-semibold text-success mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Trading Bot Q&A
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <BotFaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BotFAQ;

