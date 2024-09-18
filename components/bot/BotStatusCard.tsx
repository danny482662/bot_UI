import React from 'react';

interface BotStatusCardProps {
  title: string;
  value: string;
  description: string;
}

const BotStatusCard: React.FC<BotStatusCardProps> = ({ title, value, description }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-2xl">{value}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default BotStatusCard;
