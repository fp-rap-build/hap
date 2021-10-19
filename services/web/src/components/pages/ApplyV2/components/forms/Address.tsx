import React from 'react';

import {
  Card,
  Checkbox,
  Button,
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  Typography,
  Divider,
} from 'antd';

import { states } from '../../../../../utils/data/states';

import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../api/axiosWithAuth';
import { setCurrentUser } from '../../../../../redux/users/userActions';

const { Option } = Select;

export default function Address({
  formValues,
  handleChange,
  onStateChange,
  setCurrentContent,
  currentUser,
  dispatch,
}) {
  const request = useSelector(state => state.requests.request);

  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() =>
        updateAddress(
          formValues,
          setCurrentContent,
          request,
          currentUser,
          dispatch
        )
      }
    >
      <Card>
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
        <Button htmlType="submit">Next</Button>
      </Card>
    </Form>
  );
}

const updateAddress = async (
  formValues,
  setCurrentContent,
  request,
  currentUser,
  dispatch
) => {
  const { state, cityName, address, addressLine2, zipCode } = formValues;

  const addressInfo = {
    state,
    cityName,
    address,
    addressLine2,
    zipCode,
  };

  try {
    await axiosWithAuth().put(`/requests/${request.id}/address`, addressInfo);

    if (currentUser.applicationStep === 'address') {
      await axiosWithAuth()
        .put('/users/me', { applicationStep: 'household' })
        .then(res => {
          dispatch(setCurrentUser(res.data.user));
        });
    }

    setCurrentContent('household');
  } catch (error) {
    alert(error);
    console.log(error);
  } finally {
  }
};
