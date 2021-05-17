import React from 'react';

import { Card } from 'antd';

import { Descriptions } from 'antd';

export default function Contact({ formValues, step, setStep }) {
  return (
    <Card
      title="Secondary Contact"
      extra={
        <a href="#" onClick={() => setStep(step)}>
          Edit
        </a>
      }
    >
      {formValues.role === 'tenant' ? (
        <LandlordContact formValues={formValues} />
      ) : (
        <TenantContact formValues={formValues} />
      )}
    </Card>
  );
}

const TenantContact = ({ formValues }) => (
  <Descriptions column={1}>
    <Descriptions.Item label="Tenant Email">
      {formValues.tenantEmail}
    </Descriptions.Item>
    <Descriptions.Item label="Tenant Number">
      {formValues.tenantNumber}
    </Descriptions.Item>
  </Descriptions>
);

const LandlordContact = ({ formValues }) => (
  <Descriptions column={1}>
    <Descriptions.Item label="Landlord Email">
      {formValues.landlordEmail}
    </Descriptions.Item>
    <Descriptions.Item label="Landlord Number">
      {formValues.landlordNumber}
    </Descriptions.Item>
  </Descriptions>
);
