import React, { useState } from 'react';

import { Descriptions, Button, Form, Input } from 'antd';

export default function Basic({ request, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  return (
    <Form name="basic" initialValues={{ remember: true }} layout="vertical">
      <RenderEditButton setEditing={setDisabled} editing={disabled} />
      <>
        <Form.Item
          label="Name"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        <Form.Item
          label="State"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="Email"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        <Form.Item
          label="City"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        <Form.Item
          label="Role"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="Zip"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        <Form.Item
          label="Address"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input disabled={disabled} />
        </Form.Item>

        <Form.Item
          label="Food Worker"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={disabled} />
        </Form.Item>
        <Form.Item
          label="Unemployed for 90+ days"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={disabled} />
        </Form.Item>
      </>
    </Form>
  );
}

const RenderEditButton = ({ editing, setEditing }) => {
  if (!editing) {
    return <h1 onClick={() => setEditing(true)}>Editing</h1>;
  }

  return (
    <Button type="primary" onClick={() => setEditing(false)}>
      Edit
    </Button>
  );
};

{
  /* <Descriptions
  column={column}
  extra={<RenderEditButton editing={editing} setEditing={setEditing} />}
>
  <Descriptions.Item label="Name">{`${request.firstName} ${request.lastName}`}</Descriptions.Item>
  <Descriptions.Item label="State">{request.state}</Descriptions.Item>
  <Descriptions.Item label="Email">
    <a href={`mailto:${request.email}`}>{request.email}</a>
  </Descriptions.Item>
  <Descriptions.Item label="City">{request.cityName}</Descriptions.Item>
  <Descriptions.Item label="Phone Number">
    {request.tenantNumber}
  </Descriptions.Item>
  <Descriptions.Item label="Role">{request.role}</Descriptions.Item>
  <Descriptions.Item label="Zip">{request.zipCode}</Descriptions.Item>
  <Descriptions.Item label="Organization">none</Descriptions.Item>
  <Descriptions.Item label="Address">{request.address}</Descriptions.Item>
  <Descriptions.Item label="Food Worker">
    {request.foodWrkr ? 'Yes' : 'No'}
  </Descriptions.Item>
  <Descriptions.Item label="Unemployed for 90 days">
    {request.unEmp90 ? 'Yes' : 'No'}
  </Descriptions.Item>
</Descriptions> */
}
