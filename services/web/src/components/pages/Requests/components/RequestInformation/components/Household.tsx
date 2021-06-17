import React, { useState } from 'react';

import { Descriptions, Button, Form, Input, Select, message } from 'antd';
import EditButton from './components/EditButton';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

const { Option } = Select;

export default function Household({ request, setRequest, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const handleHouseholdSubmit = async values => {
    setRequest({ ...request, ...values });

    setDisabled(true);

    try {
      await axiosWithAuth().put(`/requests/${request.id}`, values);
    } catch (error) {
      message.error('Unable to edit household information');
    }
  };

  return (
    <Form
      style={{
        marginBottom: '3rem',
      }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleHouseholdSubmit}
      layout="vertical"
    >
      <Form.Item
        name="familySize"
        initialValue={request.familySize}
        label="Residents"
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
        hasFeedback
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
      <EditButton disabled={disabled} setDisabled={setDisabled} />
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
