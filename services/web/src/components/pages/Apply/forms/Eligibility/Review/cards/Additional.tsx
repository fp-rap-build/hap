import React from 'react';
import { Card } from 'antd';

import { Descriptions } from 'antd';
export default function Demographics({ formValues, step, setStep }) {
  return (
    <Card
      title="Additional"
      extra={
        <a href="#" onClick={() => setStep(step)}>
          Edit
        </a>
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Minor guest or pregnant">
          {yesOrNo(formValues.minorGuest)}
        </Descriptions.Item>
        <Descriptions.Item label="Been unemployed for 90+ Days?">
          {yesOrNo(formValues.unEmp90)}
        </Descriptions.Item>
        <Descriptions.Item label="Food Worker">
          {yesOrNo(formValues.foodWrkr)}
        </Descriptions.Item>
        <Descriptions.Item label="Affected by Covid">
          {yesOrNo(formValues.covidFH)}
        </Descriptions.Item>
        <Descriptions.Item label="Completed by advocate">
          {yesOrNo(formValues.advocate)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

const yesOrNo = bool => {
  if (bool) return 'Yes';

  return 'No';
};
