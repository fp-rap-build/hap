import React from 'react';

import { Card } from 'antd';

import { Descriptions } from 'antd';

export default function Contact({ formValues, content, setContent }) {
  return (
    <Card
      title="Information Needed to Process your Request"
      extra={
        <a href="#" onClick={() => setContent(content)}>
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
    <Descriptions.Item label="Landlord Name">
      {formValues.landlordName}
    </Descriptions.Item>
    <Descriptions.Item label="Landlord Address">
      {formValues.landlordAddress}
    </Descriptions.Item>
    <Descriptions.Item label="Landlord Address Line Two">
      {formValues.landlordAddress2}
    </Descriptions.Item>
    <Descriptions.Item label="Landlord City">
      {formValues.landlordCity}
    </Descriptions.Item>
    <Descriptions.Item label="Landlord State">
      {formValues.landlordState}
    </Descriptions.Item>
    <Descriptions.Item label="Landlord ZipCode">
      {formValues.landlordZip}
    </Descriptions.Item>
    <Descriptions.Item label="Landlord Email">
      {formValues.landlordEmail}
    </Descriptions.Item>
    <Descriptions.Item label="Landlord Number">
      {formValues.landlordNumber}
    </Descriptions.Item>
  </Descriptions>
);
