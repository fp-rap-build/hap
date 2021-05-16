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
        <Descriptions.Item label="Role">{formValues.role}</Descriptions.Item>
        <Descriptions.Item label="State">{formValues.state}</Descriptions.Item>
        <Descriptions.Item label="City">
          {formValues.cityName}
        </Descriptions.Item>
        <Descriptions.Item label="Address">
          {formValues.address}
        </Descriptions.Item>
        <Descriptions.Item label="Address Line 2">
          {formValues.addressLine2}
        </Descriptions.Item>
        <Descriptions.Item label="Zipcode">
          {formValues.zipCode}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
