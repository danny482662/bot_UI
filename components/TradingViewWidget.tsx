import dynamic from 'next/dynamic';
import React from 'react';

const AdvancedRealTimeChart = dynamic(() => import('react-ts-tradingview-widgets').then((mod) => mod.AdvancedRealTimeChart), { ssr: false });

const TradingViewWidget = () => {
  return (
    <div className="h-[600px]">
      <AdvancedRealTimeChart theme="dark" autosize height={600} />
    </div>
  );
};

export default TradingViewWidget;
