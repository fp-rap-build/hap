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
      <Form.Item
        initialValue={request.landlordName}
        label="Name"
        name="landlordName"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter Landlord or Property Manager Name',
          },
        ]}
      >
        <Input
          name="landlordName"
          value={request.landlordName}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        initialValue={request.landlordAddress}
        label="Address"
        name="landlordAddress"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter Landlord or Property Manager Address',
          },
        ]}
      >
        <Input
          name="landlordAddress"
          value={request.landlordAddress}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        initialValue={request.landlordAddress2}
        label="Address Line Two"
        name="landlordAddress2"
        rules={[
          {
            type: 'string',
            required: true,
            message:
              'Please enter Landlord or Property Manager Address Line Two',
          },
        ]}
      >
        <Input
          name="landlordAddress2"
          value={request.landlordAddess2}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        initialValue={request.landlordCity}
        label="City"
        name="landlordCity"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter Landlord or Property Manager City',
          },
        ]}
      >
        <Input
          name="landlordCity"
          value={request.landlordCity}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        initialValue={request.landlordState}
        label="State"
        name="landlordState"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter Landlord or Property Manager State',
          },
        ]}
      >
        <Input
          name="landlordState"
          value={request.landlordState}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        initialValue={request.landlordZip}
        label="Zipcode"
        name="landlordZip"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter Landlord or Property Manager Zipcode',
          },
        ]}
      >
        <Input
          name="landlordZip"
          value={request.landlordZip}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        initialValue={request.landlordEmail}
        label="Email"
        name="landlordEmail"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please enter a valid email',
          },
        ]}
      >
        <Input type="email" name="landlordEmail" disabled={disabled} />
      </Form.Item>

      <Form.Item
        initialValue={request.landlordNumber}
        label="Phone number"
        name="landlordNumber"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter a phone number',
          },
        ]}
      >
        <Input name="landlordNumber" disabled={disabled} />
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
