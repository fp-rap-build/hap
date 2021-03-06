import { states } from '../../../../../../utils/data/states';

import { Typography, Divider, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const { Title, Paragraph } = Typography;

const AddressInfo = ({
  addressData,
  handleAddressChange,
  handleStateChange,
  disabled,
}) => {
  return (
    <>
      <div className="addressInformation userInfoContent">
        <div className="userContentHeading">
          <Title level={4}>Address Information: </Title>
          <Paragraph>
            Start with your address; We have pulled in your responses to the
            eligibility checker. Please complete any missing portions.
          </Paragraph>
        </div>
        <Divider />
        <Form
          layout="vertical"
          name="Address Information"
          onChange={handleAddressChange}
        >
          <Form.Item
            hasFeedback
            initialValue={addressData.address}
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
            <Input name="address" disabled={disabled} />
          </Form.Item>
          <Form.Item
            initialValue={addressData.addressLine2}
            label="Address Line Two"
            name="addressLine2"
          >
            <Input name="addressLine2" disabled={disabled} />
          </Form.Item>
          <Form.Item
            hasFeedback
            initialValue={addressData.cityName}
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
            <Input name="cityName" disabled={disabled} />
          </Form.Item>
          <Form.Item
            hasFeedback
            initialValue={addressData.state}
            label="State"
            name="state"
            rules={[{ required: true, message: 'State is required' }]}
          >
            <Select
              onChange={handleStateChange}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              disabled={disabled}
            >
              {states.map(state => (
                <Option value={state}>{state}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            hasFeedback
            label="Zip Code"
            name="zipCode"
            initialValue={addressData.zipCode}
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
            <InputNumber
              name="zipCode"
              style={{ width: '100%' }}
              disabled={disabled}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default AddressInfo;
