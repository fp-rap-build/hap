import { useState } from 'react';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { Descriptions, Button, Form, Input, Select, message } from 'antd';
import EditButton from './components/EditButton';

import { states } from '../../../../../../utils/data/states';

const { Option } = Select;

export default function Advocate({ request, setRequest, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const [form] = Form.useForm();

  const resetFields = () => {
    setDisabled(true);
    form.resetFields();
  };

  const handleLandlordSubmit = async values => {
    setRequest({ ...request, ...values });

    setDisabled(true);

    try {
      await axiosWithAuth().put(`/requests/${request.id}`, values);
    } catch (error) {
      message.error('Unable to edit landlord info');
    }
  };

  return (
    <Form
      form={form}
      style={{
        marginBottom: '3rem',
      }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleLandlordSubmit}
      layout="vertical"
    >
      <Form.Item
        initialValue={request.advocateName}
        label="Name"
        name="advocateName"
        rules={[
          {
            type: 'string',
            message: 'Please enter the advocates name',
          },
        ]}
      >
        <Input value={request.advocateName} disabled={disabled} />
      </Form.Item>

      <Form.Item
        initialValue={request.advocateEmail}
        label="Email"
        name="advocateEmail"
        rules={[
          {
            type: 'email',

            message: 'Please enter a valid email',
          },
        ]}
      >
        <Input type="email" disabled={disabled} />
      </Form.Item>

      <Form.Item
        initialValue={request.advocatePhone}
        label="Phone number"
        name="advocatePhone"
        rules={[
          {
            type: 'string',

            message: 'Please enter a phone number',
          },
        ]}
      >
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item
        initialValue={request.advocateOrg}
        label="Organization"
        name="advocateOrg"
        rules={[
          {
            type: 'string',
            message: 'Please enter an organization',
          },
        ]}
      >
        <Input disabled={disabled} />
      </Form.Item>
      <EditButton
        disabled={disabled}
        setDisabled={setDisabled}
        onCancel={resetFields}
      />
    </Form>
  );
}
