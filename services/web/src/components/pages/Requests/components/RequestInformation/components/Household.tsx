import React, { useState } from 'react';

import { Descriptions, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

export default function Household({ request, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form
      style={{
        marginBottom: '3rem',
      }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="familySize"
        initialValue={request.familySize}
        label="Residents"
        required
        hasFeedback
        rules={[
          {
            pattern: RegExp(/^([1-9][0-9]?)\s*$/),
            message: 'Invalid number of residents',
          },
        ]}
      >
        <Input
          disabled={disabled}
          style={{ width: '100%' }}
          name="familySize"
        />
      </Form.Item>
      <Form.Item
        name="totalChildren"
        initialValue={request.totalChildren}
        label="Number of Children in Household"
        required
        hasFeedback
        rules={[
          {
            message: 'Number of children required',
          },
        ]}
      >
        <Select disabled={disabled} style={{ width: '100%' }}>
          {numChildren.map(num => (
            <Option value={num}>{num}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        hasFeedback
        name="monthlyIncome"
        initialValue={request.monthlyIncome}
        label={'Monthly Income'}
        rules={[
          {
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid income',
          },
        ]}
      >
        <Input
          disabled={disabled}
          name="monthlyIncome"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="monthlyRent"
        initialValue={request.monthlyRent}
        label={'Monthly Rent'}
        rules={[
          {
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid rent',
          },
        ]}
      >
        <Input
          disabled={disabled}
          name="monthlyRent"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="owed"
        initialValue={request.owed}
        label={'Total Amount Owed'}
        rules={[
          {
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid total',
          },
        ]}
      >
        <Input disabled={disabled} name="owed" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="amountRequested"
        initialValue={request.amountRequested}
        label={'Amount of Assistance Requested'}
        rules={[
          {
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid total',
          },
        ]}
      >
        <Input
          disabled={disabled}
          name="amountRequested"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <RenderEditButton setEditing={setDisabled} editing={disabled} />
    </Form>
  );
}

const RenderEditButton = ({ editing, setEditing }) => {
  if (!editing) {
    return <h1 onClick={() => setEditing(true)}>Editing</h1>;
  }

  return (
    <Button type="primary" htmlType="submit" onClick={() => setEditing(false)}>
      Edit
    </Button>
  );
};

const numChildren = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
