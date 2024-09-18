// components/dashboard/TradeStatusTable.tsx
import React from 'react';
import { TradeStatus } from '@/types/types';

interface TradeStatusTableProps {
  trades: TradeStatus[];
}

const TradeStatusTable: React.FC<TradeStatusTableProps> = ({ trades }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Trading History</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Timeframe</th>
                <th>Status
                (Order: <span className="badge badge-warning badge-xs"></span>  | Position: <span className="badge badge-success badge-xs"></span>)
                </th>
                <th>Quantity</th>
                <th>Entry Price</th>
                <th>Take Profit Price</th>
              </tr>
            </thead>
            <tbody>
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">No trades available</td>
                </tr>
              ) : (
                trades.map((trade, index) => (
                  <tr key={index} className="hover:bg-base-200">
                    <td>{trade.ticker}</td>
                    <td>{trade.timeframe}</td>
                    <td>
                      <span className={`badge ${trade.status === 'POSITION' ? 'badge-success' : 'badge-warning'}`}>
                        {trade.status}
                      </span>
                    </td>
                    <td>{trade.quantity}</td>
                    <td>${trade.price}</td>
                    <td>${trade.take_profit_price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradeStatusTable;
