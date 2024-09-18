"use client";
import React, { useState } from 'react';

const MultiStepBotConfig = ({ onSubmit, onClose }: { onSubmit: (data: any) => void, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    api_key: '',
    api_secret: '',
    ticker: 'BTCUSDT', // default to a valid option
    quantity: 0,
    timeframe: '4h', // default to a valid option
    demo: false,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiSecret, setShowApiSecret] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let updatedValue: string | number | boolean;

    if (type === 'checkbox') {
      updatedValue = (e.target as HTMLInputElement).checked;
    } else {
      updatedValue = value;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'quantity' ? parseFloat(updatedValue as string) : updatedValue
    }));
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      order_size: parseFloat(formData.quantity.toString()) || 0 // Ensure order_size is a float
    };
    onSubmit(finalData);
  };

  return (
    <div className="p-8 space-y-5">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
      <h2 className="text-xl mb-5 font-bold text-center">Configure Your Bot</h2>
      {step === 1 && (
        <div>
          <p className="italic text-white my-8">&quot;The four most dangerous words in investing are: &apos;This time it&apos;s different.&apos;&quot; - Sir John Templeton</p>
          <label className="block mb-4">API Key</label>
          <div className="relative mb-8 flex items-center">
            <input
              name="api_key"
              type={showApiKey ? 'text' : 'password'}
              value={formData.api_key}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <button
              type="button"
              className="ml-2 btn btn-ghost btn-xs"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <label className="block mb-4">API Secret</label>
          <div className="relative mb-8 flex items-center">
            <input
              name="api_secret"
              type={showApiSecret ? 'text' : 'password'}
              value={formData.api_secret}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <button
              type="button"
              className="ml-2 btn btn-ghost btn-xs"
              onClick={() => setShowApiSecret(!showApiSecret)}
            >
              {showApiSecret ? 'Hide' : 'Show'}
            </button>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleNext}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p className="italic text-white my-8">&quot;The stock market is filled with individuals who know the price of everything, but the value of nothing.&quot; - Philip Fisher</p>
          <label className="block mb-4">Ticker</label>
          <select
            name="ticker"
            value={formData.ticker}
            onChange={handleChange}
            className="input input-bordered w-full mb-8"
          >
            <option value="BTCUSDT">BTCUSDT</option>
            <option value="ETHUSDT">ETHUSDT</option>
            <option value="BNBUSDT">BNBUSDT</option>
            <option value="SOLUSDT">SOLUSDT</option>
            <option value="MATICUSDT">MATICUSDT</option>
            <option value="DOGEUSDT">DOGEUSDT</option>
          </select>
          <label className="block mb-4">Order Size</label>
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="input input-bordered w-full mb-8"
          />
          <div className="flex justify-between mt-4">
            <button className="btn btn-secondary" onClick={handlePrevious}>Previous</button>
            <button className="btn btn-primary" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <p className="italic text-white my-8">&quot;In investing, what is comfortable is rarely profitable.&quot; - Robert Arnott</p>
          <label className="block mb-4">Timeframe</label>
          <select
            name="timeframe"
            value={formData.timeframe}
            onChange={handleChange}
            className="input input-bordered w-full mb-8"
          >
            <option value="1h">1h</option>
            <option value="4h">4h</option>
            <option value="1d">1d</option>
          </select>
          <label className="block mb-4">Demo</label>
          <input
            name="demo"
            type="checkbox"
            checked={formData.demo}
            onChange={handleChange}
            className="checkbox checkbox-primary mb-8"
          />
          <div className="flex justify-between mt-4">
            <button className="btn btn-secondary" onClick={handlePrevious}>Previous</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Run</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepBotConfig;
