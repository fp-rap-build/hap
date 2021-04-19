import React from 'react';

import { Descriptions } from 'antd';

export default function Basic({ request, column = 2 }) {
  return (
    <Descriptions column={column}>
      <Descriptions.Item label="Name">{`${request.firstName} ${request.lastName}`}</Descriptions.Item>
      <Descriptions.Item label="State">{request.state}</Descriptions.Item>
      <Descriptions.Item label="Email">{request.email}</Descriptions.Item>
      <Descriptions.Item label="City">{request.cityName}</Descriptions.Item>
      <Descriptions.Item label="Role">{request.role}</Descriptions.Item>
      <Descriptions.Item label="Zip">{request.zipCode}</Descriptions.Item>
      <Descriptions.Item label="Organization">none</Descriptions.Item>
      <Descriptions.Item label="Address">{request.address}</Descriptions.Item>
      <Descriptions.Item label="Food Worker">
        {request.foodWrkr ? 'yes' : 'no'}
      </Descriptions.Item>
      <Descriptions.Item label="Unemployed for 90 days">
        {request.unEmp90 ? 'yes' : 'no'}
      </Descriptions.Item>
    </Descriptions>
  );
}
