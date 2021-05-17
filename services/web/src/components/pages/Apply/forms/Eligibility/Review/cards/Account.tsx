import React, { useState } from 'react';

import { Card } from 'antd';

import { Descriptions } from 'antd';

export default function Account({ formValues, step, setStep }) {
  return (
    <Card
      title="Account"
      extra={
        <a href="#" onClick={() => setStep(step)}>
          Edit
        </a>
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="First name">
          {formValues.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Last name">
          {formValues.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{formValues.email}</Descriptions.Item>
        <Descriptions.Item label="Phone number">
          {formValues.phoneNumber}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
