//Components
import CardTitle from '../../CardTitle';
//Utils
import { states } from '../../../../../utils/data/states';
//UI
import { Card, Form, Select, Input, InputNumber } from 'antd';
const { Option } = Select;

const BasicInformation = ({ formValues, onRoleChange, onStateChange }) => {
  return (
    <div>
      <Card title={<CardTitle percentage={20} title="Basic Information" />}>
        <Form.Item
          hasFeedback
          initialValue={formValues.role}
          label="Are you a Landlord or Tenant?"
          name="role"
          rules={[{ required: true, message: 'required' }]}
          extra={
            formValues.role === 'landlord'
              ? 'Please enter your own address information below'
              : null
          }
        >
          <Select
            onChange={onRoleChange}
            placeholder="Are you a Landlord or Tenant"
          >
            <Option value="tenant">Tenant</Option>
            <Option value="landlord">Landlord</Option>
          </Select>
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.state}
          label="State"
          name="state"
          rules={[{ required: true, message: 'State is required' }]}
        >
          <Select
            onChange={onStateChange}
            showSearch
            placeholder="Select a state"
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
          hasFeedback
          initialValue={formValues.cityName}
          label="City"
          name="cityName"
          rules={[
            { required: true, min: 3, message: 'City is required' },
            {
              pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
              message: 'Enter a valid City Name',
            },
          ]}
        >
          <Input name="cityName" value={formValues.city} />
        </Form.Item>

        <Form.Item
          hasFeedback
          initialValue={formValues.address}
          label="Address"
          name="address"
          rules={[
            { required: true, message: 'Address is required' },
            {
              pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
              message: 'Enter a valid City Name',
            },
          ]}
        >
          <Input name="address" />
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.addressLine2}
          label="Address Line Two"
          name="addressLine2"
        >
          <Input name="addressLine2" />
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.zipCode}
          label="Postal Code"
          name="zipCode"
          rules={[
            {
              type: 'number',
              required: true,
              message: 'Postal code is required',
            },
            {
              required: true,
              pattern: RegExp(/^\d{5}$/),
              message: 'Invalid postal code',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} name="zipCode" />
        </Form.Item>
      </Card>
    </div>
  );
};

export default BasicInformation;
