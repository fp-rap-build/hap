import React from 'react';

import { Card } from 'antd';

import { Descriptions } from 'antd';

export default function Household({ formValues, step, setStep }) {
  return (
    <Card
      title="Household"
      extra={
        <a href="#" onClick={() => setStep(step)}>
          Edit
        </a>
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Residents">
          {formValues.familySize}
        </Descriptions.Item>
        <Descriptions.Item label="Children in Household">
          {formValues.totalChildren}
        </Descriptions.Item>
        <Descriptions.Item label="Monthly Income">
          {formValues.monthlyIncome}
        </Descriptions.Item>
        <Descriptions.Item label="Total Bedrooms">
          {formValues.beds}
        </Descriptions.Item>
        <Descriptions.Item label="Monthly Rent">
          {formValues.monthlyRent}
        </Descriptions.Item>
        <Descriptions.Item label="Total Owed">
          {formValues.owed}
        </Descriptions.Item>
        <Descriptions.Item label="Amount Requested">
          {formValues.amountRequested}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

const boolToAnswer = bool => {
  if (bool) return 'Yes';

  return 'No';
};
