import React from 'react';
import { Card } from 'antd';

import { Descriptions } from 'antd';
export default function Demographics({ formValues, content, setContent }) {
  return (
    <Card
      title="Demographics"
      extra={
        <a href="#" onClick={() => setContent(content)}>
          Edit
        </a>
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Hispanic/ Latino">
          {yesOrNo(formValues.hispanic)}
        </Descriptions.Item>
        <Descriptions.Item label="Asian">
          {yesOrNo(formValues.asian)}
        </Descriptions.Item>
        <Descriptions.Item label="Black or African American">
          {yesOrNo(formValues.black)}
        </Descriptions.Item>
        <Descriptions.Item label="Native Hawaiian or Other Pacific Islander">
          {yesOrNo(formValues.pacific)}
        </Descriptions.Item>
        <Descriptions.Item label="White">
          {yesOrNo(formValues.white)}
        </Descriptions.Item>
        <Descriptions.Item label="Native American or Alaskan Native">
          {yesOrNo(formValues.native)}
        </Descriptions.Item>

        <Descriptions.Item
          label="Rather
        Not Say"
        >
          {yesOrNo(formValues.demoNotSay)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

const yesOrNo = bool => {
  if (bool) return 'Yes';

  return 'No';
};
