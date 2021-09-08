import React, { useState } from 'react';

import { Card } from 'antd';

import { Descriptions } from 'antd';

const formatDate = date => {
  date = new Date(date);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate() + 1;

  return `${year} / ${month} / ${day}`;
};

export default function Basic({ formValues, content, setContent }) {
  return (
    <Card
      title="Address"
      extra={
        <a href="#" onClick={() => setContent(content)}>
          Edit
        </a>
      }
    >
      <Descriptions column={1}>
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
