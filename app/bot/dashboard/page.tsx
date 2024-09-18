// pages/bot/dashboard.tsx
"use client";

import React, { Suspense, useEffect, useState } from 'react';
import MembersNavbar from '@/components/MembersNavbar';
import BotStatusCard from '@/components/bot/BotStatusCard';
import TradingViewWidget from '@/components/TradingViewWidget';
import TradeStatusTable from '@/components/TradeStatusTable';
import BotExecutor from '@/components/bot/BotExecutor';
import BotFAQ from "@/components/BotFAQ";
import { getSession } from 'next-auth/react';
import { renderSchemaTags } from '@/libs/seo';
import { TradeStatus } from '@/types/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL;

const Dashboard: React.FC = () => {
  const [botStatus, setBotStatus] = useState({ balance: 0, activeTrades: 0, profitLoss: 0, takeProfitPrice: 0 });
  const [trades, setTrades] = useState<TradeStatus[]>([]);

  const fetchTrades = async () => {
    try {
      const response = await fetch('/api/trade');
      if (response.ok) {
        const data: TradeStatus[] = await response.json();
        setTrades(data);
        const totalTakeProfitPrice = data.reduce((acc, trade) => acc + trade.take_profit_price, 0);
        setBotStatus(prevStatus => ({ ...prevStatus, activeTrades: data.length, takeProfitPrice: totalTakeProfitPrice }));
      } else {
        console.error('Failed to fetch trades');
      }
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  const fetchInvestmentStatus = async () => {
    try {
      const session = await getSession();
      if (!session || !session.user) {
        console.error("User not authenticated");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/bot/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: session.user.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setBotStatus(prevStatus => ({ ...prevStatus, balance: data.total_investment }));
      } else {
        console.error('Failed to fetch investment status');
      }
    } catch (error) {
      console.error('Error fetching investment status:', error);
    }
  };

  useEffect(() => {
    fetchTrades();
    fetchInvestmentStatus();
  }, []);

  return (
    <>
      {renderSchemaTags()}
      
      <Suspense>
        <MembersNavbar />
      </Suspense>
      <main>
        <div className="container mx-auto p-4">
          <BotExecutor activeTrades={botStatus.activeTrades} fetchTrades={fetchTrades} fetchInvestmentStatus={fetchInvestmentStatus} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <BotStatusCard title="Initial Balance" value={botStatus.balance.toString() + '$'} description="The amount of $ you initially invested into the bot!" />
            <BotStatusCard title="Active Trades" value={ botStatus.activeTrades.toString() } description="The number of currently running bots!" />
            <BotStatusCard title="Take Profit Price" value={ botStatus.takeProfitPrice.toString() + '$' } description="The price at which your bot will take profits! This keeps changing with time!" />
          </div>
          <div className="mb-8">
            <TradingViewWidget />
          </div>
          <TradeStatusTable trades={trades} />
          <BotFAQ />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
