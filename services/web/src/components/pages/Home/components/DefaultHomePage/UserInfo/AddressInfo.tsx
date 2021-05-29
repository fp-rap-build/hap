import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { updateAddress } from '../../../../../../redux/requests/requestActions';

import { states } from '../../../../../../utils/data/states';

import {
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
} from 'antd';

const { Option } = Select;

const { Title, Paragraph } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddressInfo = ({
  addressData,
  handleAddressChange,
  handleStateChange,
  disabled,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="addressInformation userInfoContent">
        <div className="userContentHeading">
          <Title level={4}>Address Information: </Title>
          <Paragraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet,
            dolorum! Debitis praesentium natus necessitatibus sit maxime dolore,
            dolorem laboriosam animi dignissimos quis, illo magnam molestias
            maiores at, optio recusandae magni.
          </Paragraph>
        </div>
        <Divider />
        <Form
          {...layout}
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
