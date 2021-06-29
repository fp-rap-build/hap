import { Statistic } from 'antd';
import React from 'react';

import calculateAmi from '../../../../../../utils/general/calculateAmi';

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
        value={Number(calculateAmi(request.monthlyIncome, request.familySize))}
      />

      <Statistic
        title="Unemployed 90+"
        value={request.unEmp90 ? 'Yes' : 'No'}
      />
    </div>
  );
}
