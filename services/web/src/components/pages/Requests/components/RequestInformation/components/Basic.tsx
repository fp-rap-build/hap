import React, { useState } from 'react';

import { Descriptions, Button, Form, Input } from 'antd';

export default function Basic({ request, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const onFinish = values => {};

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
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item label="Role" name="role" initialValue={request.role}>
        <Input disabled={disabled} />
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
