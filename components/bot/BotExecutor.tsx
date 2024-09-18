// components/bot/BotExecutor.tsx
"use client";

import React, { useState, useEffect } from 'react';
import MultiStepBotConfig from './MultiStepBotConfig';
import { useSession } from 'next-auth/react';
import Modal from '@/components/Modal';

interface BotExecutorProps {
  activeTrades: number;
  fetchTrades: () => void;
  fetchInvestmentStatus: () => void;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL;

const BotExecutor: React.FC<BotExecutorProps> = ({ activeTrades, fetchTrades, fetchInvestmentStatus }) => {
  const { data: session } = useSession();
  const [isRunning, setIsRunning] = useState(activeTrades > 0);
  const [showModal, setShowModal] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    setIsRunning(activeTrades > 0);
  }, [activeTrades]);

  const handleRunBot = () => {
    setShowModal(true);
    setErrorMessage(null);
  };

  const handleFormSubmit = async (data: any) => {
    if (!session || !session.user) {
      console.error("User not authenticated");
      return;
    }

    const payload = {
      user_id: session.user.id,
      api_key: data.api_key,
      api_secret: data.api_secret,
      ticker: data.ticker,
      quantity: data.quantity,
      timeframe: data.timeframe,
      demo: data.demo,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/bot/trades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        setTaskId(responseData.task_id);

        const taskPayload = {
          task_id: responseData.task_id,
        };

        const taskResponse = await fetch('/api/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskPayload),
        });

        if (taskResponse.ok) {
          setIsRunning(true);
          setShowModal(false);
          
          fetchTrades();
          fetchInvestmentStatus();

        } else {
          console.error('Failed to create user task');
        }
      } else if (response.status === 400) {
        setErrorMessage('Currently Supporting only 1 Trade Per User!');
        setIsErrorModalOpen(true);
        setShowModal(false);
      } else {
        console.error('Failed to create trade');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An error occurred while processing your request. Please try again later.');
      setIsErrorModalOpen(true);
      setShowModal(false);
    }
  };

  const handleStopBot = async () => {
    if (!session || !session.user) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/bot/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: session.user.id }),
      });

      if (response.ok) {
        setIsRunning(false);
        setTaskId(null);
        await fetchTrades();
        await fetchInvestmentStatus();
      } else {
        setErrorMessage('Failed to stop the bot. Please try again later.');
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      setErrorMessage('Failed to stop the bot. Please try again later.');
      setIsErrorModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-center space-x-4 m-8">
      <button
        className={`btn ${isRunning ? 'btn-disabled' : 'btn-success'}`}
        onClick={handleRunBot}
        disabled={isRunning}
      >
        Run Bot
      </button>
      <button
        className={`btn ${!isRunning ? 'btn-disabled' : 'btn-error'}`}
        onClick={handleStopBot}
        disabled={!isRunning}
      >
        Stop Bot
      </button>

      {showModal && (
        <div className="modal modal-open" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <MultiStepBotConfig onSubmit={handleFormSubmit} onClose={handleCloseModal} />
          </div>
        </div>
      )}
      <Modal
        isModalOpen={isErrorModalOpen}
        setIsModalOpen={setIsErrorModalOpen}
        title='Trades Limit Exceeded'
        message='You can only make one trade at a time. Please stop your current trade before starting a new one.'
      />
    </div>
  );
};

export default BotExecutor;
