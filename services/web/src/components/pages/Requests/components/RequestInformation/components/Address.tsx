import React, { useState } from 'react';

import { Descriptions, Button, Form, Input } from 'antd';

export default function Address({ request, column = 2 }) {
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
      <Form.Item label="Address" name="address" initialValue={request.address}>
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item label="State" name="state" initialValue={request.state}>
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item label="City" name="cityName" initialValue={request.cityName}>
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item label="Zip" name="zipCode" initialValue={request.zipCode}>
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
