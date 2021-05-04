import { Statistic } from 'antd';
import React from 'react';

export default function Footer({ request }) {
  return (
    <div
      style={{
        display: 'flex',
        width: 'max-content',
        justifyContent: 'flex-end',
        gap: '2.5rem',
        position: 'absolute',
        bottom: 0,
      }}
    >
      <Statistic title="Status" value={request.requestStatus} />

      <Statistic title="Residents" value={request.familySize} />
      <Statistic
        title="Monthly Income"
        prefix="$"
        value={request.monthlyIncome}
      />
      <Statistic title="Monthly Rent" prefix="$" value={request.monthlyRent} />
      <Statistic
        title="Amount Requested"
        prefix="$"
        value={request.amountRequested}
      />
    </div>
  );
}
