import React, { useState } from 'react';

import { Card } from 'antd';

import { Descriptions } from 'antd';

const formatDate = date => {
  date = new Date(date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year} / ${month} / ${day}`;
};

export default function Basic({ formValues, step, setStep }) {
  return (
    <Card
      title="Basic"
      extra={
        <a href="#" onClick={() => setStep(step)}>
          Edit
        </a>
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Gender">
          {formValues.gender}
        </Descriptions.Item>

        <Descriptions.Item label="Date of Birth">
          {formatDate(formValues.dob)}
        </Descriptions.Item>

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
