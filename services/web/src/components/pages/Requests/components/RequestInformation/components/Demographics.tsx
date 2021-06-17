import React, { useState } from 'react';

import { Descriptions, Button, Form, Input, Checkbox, message } from 'antd';
import EditButton from './components/EditButton';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

export default function Address({ request, setRequest, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const [checkboxValues, setCheckboxValues] = useState({
    hispanic: request.hispanic,
    asian: request.asian,
    black: request.black,
    pacific: request.pacific,
    white: request.white,
    native: request.native,
    demoNotSay: request.demoNotSay,
  });

  const handleDemograpicSubmit = async () => {
    setRequest({ ...request, ...checkboxValues });

    setDisabled(true);

    try {
      await axiosWithAuth().put(`/requests/${request.id}`, checkboxValues);
    } catch (error) {
      message.error('Unable to edit demographics');
    }
  };

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;

    return setCheckboxValues({ ...checkboxValues, [name]: checked });
  };

  return (
    <Form
      style={{
        marginBottom: '3rem',
      }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleDemograpicSubmit}
      layout="vertical"
    >
      <Form.Item initialValue={true}>
        <Checkbox
          checked={checkboxValues.hispanic}
          disabled={disabled}
          name="hispanic"
          onChange={handleCheckboxChange}
        >
          Hispanic/ Latino
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={checkboxValues.asian}
          disabled={disabled}
          onChange={handleCheckboxChange}
          name="asian"
        >
          Asian
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={checkboxValues.black}
          disabled={disabled}
          onChange={handleCheckboxChange}
          name="black"
        >
          Black or African American
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={checkboxValues.pacific}
          disabled={disabled}
          onChange={handleCheckboxChange}
          name="pacific"
        >
          Native Hawaiian or Other Pacific Islander
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={checkboxValues.white}
          disabled={disabled}
          onChange={handleCheckboxChange}
          name="white"
        >
          White
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={checkboxValues.native}
          disabled={disabled}
          onChange={handleCheckboxChange}
          name="native"
        >
          Native American or Alskan Native
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={checkboxValues.demoNotSay}
          disabled={disabled}
          onChange={handleCheckboxChange}
          name="demoNotSay"
        >
          Rather Not Say
        </Checkbox>
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
