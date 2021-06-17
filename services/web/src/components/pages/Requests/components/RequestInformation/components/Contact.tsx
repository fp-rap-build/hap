import { useState } from 'react';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { Descriptions, Button, Form, Input, Select, message } from 'antd';
import EditButton from './components/EditButton';

import { states } from '../../../../../../utils/data/states';

const { Option } = Select;

export default function Address({ request, setRequest, column = 2 }) {
  const [disabled, setDisabled] = useState(true);

  const handleLandlordSubmit = async values => {
    setRequest({ ...request, ...values });

    setDisabled(true);

    try {
      await axiosWithAuth().put(`/requests/${request.id}`, values);
    } catch (error) {
      message.error('Unable to edit landlord info');
    }
  };

  return (
    <Form
      style={{
        marginBottom: '3rem',
      }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleLandlordSubmit}
      layout="vertical"
    >
      <Form.Item
        initialValue={request.landlordName}
        label="Name"
        name="landlordName"
        rules={[
          {
            type: 'string',
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
        hasFeedback
        initialValue={request.landlordState}
        label="State"
        name="landlordState"
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

      <Form.Item
        initialValue={request.landlordCity}
        label="City"
        name="landlordCity"
        rules={[
          {
            type: 'string',

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
        initialValue={request.landlordZip}
        label="Zipcode"
        name="landlordZip"
        rules={[
          {
            type: 'string',

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

            message: 'Please enter a valid email',
          },
        ]}
      >
        <Input type="email" name="landlordEmail" disabled={true} />
      </Form.Item>

      <Form.Item
        initialValue={request.landlordNumber}
        label="Phone number"
        name="landlordNumber"
        rules={[
          {
            type: 'string',

            message: 'Please enter a phone number',
          },
        ]}
      >
        <Input name="landlordNumber" disabled={disabled} />
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
