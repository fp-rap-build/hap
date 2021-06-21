import React, { useState } from 'react';

import { Descriptions, Button, Form, Input, message } from 'antd';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';
import EditButton from './components/EditButton';

export default function Basic({ request, setRequest, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const [form] = Form.useForm();

  const resetFields = () => {
    setDisabled(true);
    form.resetFields();
  };

  const handleUserEditSubmit = async values => {
    setRequest({ ...request, ...values });

    setDisabled(true);

    try {
      await axiosWithAuth().put(`/users/${request.userId}`, values);
    } catch (error) {
      message.error('Unable to edit user');
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
      onFinish={handleUserEditSubmit}
      layout="vertical"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        initialValue={request.firstName}
      >
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        initialValue={request.lastName}
      >
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item label="Email" name="email" initialValue={request.email}>
        <Input disabled={true} />
      </Form.Item>

      <Form.Item label="Role" name="role" initialValue={request.role}>
        <Input disabled={true} />
      </Form.Item>
      <EditButton
        disabled={disabled}
        setDisabled={setDisabled}
        onCancel={resetFields}
      />
    </Form>
  );
}

{
  /* <Form.Item
        label="First Name"
        name="firstName"
        initialValue={request.firstName}
      >
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        initialValue={request.lastName}
      >
        <Input disabled={disabled} defaultValue={request.lastName} />
      </Form.Item>

      <Form.Item label="State" name="state" initialValue={request.state}>
        <Input disabled={disabled} defaultValue={request.state} />
      </Form.Item>
      <Form.Item label="Email" name="email" initialValue={request.email}>
        <Input disabled={disabled} defaultValue={request.email} />
      </Form.Item>

      <Form.Item label="City" name="cityName" initialValue={request.cityName}>
        <Input disabled={disabled} defaultValue={request.cityName} />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="tenantNumber"
        initialValue={request.tenantNumber}
      >
        <Input disabled={disabled} defaultValue={request.tenantNumber} />
      </Form.Item>

      <Form.Item label="Role" name="role" initialValue={request.role}>
        <Input disabled={disabled} defaultValue={request.role} />
      </Form.Item>
      <Form.Item label="Zip" name="zipCode" initialValue={request.zipCode}>
        <Input disabled={disabled} defaultValue={request.zipCode} />
      </Form.Item>

      <Form.Item label="Address" name="address" initialValue={request.address}>
        <Input disabled={disabled} defaultValue={request.address} />
      </Form.Item>

      <Form.Item
        label="Food Worker"
        name="foodWrkr"
        initialValue={request.foodWrkr}
      >
        <Input disabled={disabled} defaultValue={request.foodWrkr} />
      </Form.Item>
      <Form.Item
        label="Unemployed for 90+ days"
        name="unEmp90"
        initialValue={request.unEmp90}
      >
        <Input disabled={disabled} defaultValue={request.unEmp90} />
      </Form.Item>
      <Button htmlType="submit">Submit</Button> */
}
