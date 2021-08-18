import { useState } from 'react';

import { Form, Input, Select, message } from 'antd';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';
import EditButton from './components/EditButton';

import { genders } from '../../../../../../utils/data/genders';

const { Option } = Select;

export default function Basic({ request, setRequest, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const formatDate = date => {
    if (!date) return;

    const splitDate = date.split('T');
    return splitDate[0];
  };

  const [form] = Form.useForm();

  const resetFields = () => {
    setDisabled(true);
    form.resetFields();
  };

  const handleUserEditSubmit = async values => {
    setRequest({ ...request, ...values });

    setDisabled(true);

    const requestValues = {
      tenantNumber: values.tenantNumber,
    };

    const userValues = {
      firstName: values.firstName,
      lastName: values.lastName,
      dob: values.dob,
      gender: values.gender
    };

    try {
      await axiosWithAuth().put(`/users/${request.userId}`, userValues);
      await axiosWithAuth().put(`/requests/${request.id}`, requestValues);
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

      <Form.Item
        label="Phone"
        name="tenantNumber"
        initialValue={request.tenantNumber}
      >
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item
        label="DOB"
        name="dob"
        initialValue={formatDate(request.dob)}
        tooltip="YYYY / MM / DD"
      >
        <Input disabled={disabled} />
      </Form.Item>


      <Form.Item
        hasFeedback
        initialValue={request.gender}
        label="Gender"
        name="gender"
      >
        <Select
          showSearch
          placeholder="Select a gender"
          disabled={disabled}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {genders.map(gender => (
            <Option value={gender}>{gender}</Option>
          ))}
        </Select>
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
