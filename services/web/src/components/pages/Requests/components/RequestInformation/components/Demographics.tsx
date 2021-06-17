import React, { useState } from 'react';

import { Descriptions, Button, Form, Input, Checkbox } from 'antd';

export default function Address({ request, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const onFinish = values => {
    console.log(values);
  };

  const handleRequestChange = () => {
    console.log('hello');
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
      <Form.Item>
        <Checkbox
          checked={request.hispanic}
          disabled={disabled}
          name="hispanic"
          onChange={handleRequestChange}
        >
          Hispanic/ Latino
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={request.asian}
          disabled={disabled}
          onChange={handleRequestChange}
          name="asian"
        >
          Asian
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={request.black}
          disabled={disabled}
          onChange={handleRequestChange}
          name="black"
        >
          Black or African American
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={request.pacific}
          disabled={disabled}
          onChange={handleRequestChange}
          name="pacific"
        >
          Native Hawaiian or Other Pacific Islander
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={request.white}
          disabled={disabled}
          onChange={handleRequestChange}
          name="white"
        >
          White
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={request.native}
          disabled={disabled}
          onChange={handleRequestChange}
          name="native"
        >
          Native American or Alskan Native
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={request.demoNotSay}
          disabled={disabled}
          onChange={handleRequestChange}
          name="demoNotSay"
        >
          Rather Not Say
        </Checkbox>
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
