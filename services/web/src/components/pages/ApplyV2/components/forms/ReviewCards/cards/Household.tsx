import React from 'react';

import { Card } from 'antd';

import { Descriptions } from 'antd';

export default function Household({ formValues, content, setContent }) {
  return (
    <Card
      title="Household"
      extra={
        <a href="#" onClick={() => setContent(content)}>
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

        <Descriptions.Item label="Total Bedrooms">
          {formValues.beds}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

const boolToAnswer = bool => {
  if (bool) return 'Yes';

  return 'No';
};
