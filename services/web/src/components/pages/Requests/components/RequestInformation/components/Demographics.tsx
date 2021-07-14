import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { updateRequest } from '../../../../../../redux/requests/requestActions';

import EditButton from './components/EditButton';

import { Form, Checkbox } from 'antd';

export default function Address({ request, setRequest, currentUser }) {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);

  const [form] = Form.useForm();

  const resetFields = () => {
    setDisabled(true);
    form.resetFields();

    setCheckboxValues({
      hispanic: request.hispanic,
      asian: request.asian,
      black: request.black,
      pacific: request.pacific,
      white: request.white,
      native: request.native,
      demoNotSay: request.demoNotSay,
    });
  };

  const [checkboxValues, setCheckboxValues] = useState({
    hispanic: request.hispanic,
    asian: request.asian,
    black: request.black,
    pacific: request.pacific,
    white: request.white,
    native: request.native,
    demoNotSay: request.demoNotSay,
  });

  const handleDemograpicSubmit = () => {
    setRequest({ ...request, ...checkboxValues });

    checkboxValues['id'] = request.id;

    dispatch(updateRequest(checkboxValues, currentUser));

    setDisabled(true);
  };

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;

    return setCheckboxValues({ ...checkboxValues, [name]: checked });
  };

  return (
    <Form
      form={form}
      style={{
        marginBottom: '3rem',
      }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleDemograpicSubmit}
      layout="vertical"
    >
      <Form.Item>
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
      <EditButton
        disabled={disabled}
        setDisabled={setDisabled}
        onCancel={resetFields}
      />
    </Form>
  );
}

// const RenderEditButton = ({ editing, setEditing }) => {
//   if (!editing) {
//     return <h1 onClick={() => setEditing(true)}>Editing</h1>;
//   }

//   return (
//     <Button type="primary" htmlType="submit" onClick={() => setEditing(false)}>
//       Edit
//     </Button>
//   );
// };
