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
      <Statistic title="AMI" suffix="%" value={ Number(((request.monthlyIncome*12/71700)).toFixed(2))*100  }/>
     
      <Statistic
        title="Amount Requested"
        prefix="$"
        value={request.amountRequested}
      />
      <Statistic
      title="Completed by Advocate?"
      value={request.advocate ? 'Yes' : 'No'}
      
      />
    </div>
  );
}
