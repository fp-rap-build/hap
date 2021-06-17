import { useState } from 'react';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { Descriptions, Button, Form, Input, Select, message } from 'antd';

import EditButton from './components/EditButton';

import { states } from '../../../../../../utils/data/states';

const { Option } = Select;

export default function Address({ request, setRequest, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const [form] = Form.useForm();

  const resetFields = () => {
    setDisabled(true);
    form.resetFields();
  };

  const handleAddressSubmit = async values => {
    setRequest({ ...request, ...values });

    setDisabled(true);

    try {
      await axiosWithAuth().put(`/requests/${request.id}/address`, values);
    } catch (error) {
      message.error('Unable to edit address');
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
      onFinish={handleAddressSubmit}
      layout="vertical"
    >
      <Form.Item label="Address" name="address" initialValue={request.address}>
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item
        hasFeedback
        initialValue={request.state}
        label="State"
        name="state"
      >
        <Select
          showSearch
          placeholder="Select a state"
          disabled={disabled}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {states.map(state => (
            <Option value={state}>{state}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="City" name="cityName" initialValue={request.cityName}>
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item label="Zip" name="zipCode" initialValue={request.zipCode}>
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
