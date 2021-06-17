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

      <Statistic
        title="AMI"
        suffix="%"
        value={Number(((request.monthlyIncome * 12) / 71700).toFixed(2)) * 100}
      />

      <Statistic
        title="Unemployed 90+"
        value={request.unEmp90 ? 'Yes' : 'No'}
      />
    </div>
  );
}
