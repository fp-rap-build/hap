import { Alert, Card, Button, Form, Select, Input } from 'antd';

import { useSelector } from 'react-redux';

import { useState } from 'react';

import useAddressAutoSuggestions from '../../../../../../../../utils/hooks/useAddressAutoSuggestions';

const { Option } = Select;

export default function Index({
  formValues,
  setFormValues,
  handleChange,
  onStateChange,
  setEligibilityContent,
  currentUser,
  dispatch,
}) {
  const request = useSelector(state => state.requests.request);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [autosuggestions, handleAutoChange] = useAddressAutoSuggestions([]);

  const [address, setAddress] = useState({});

  const parseAddress = str => {
    str = str.split(',');

    let address = str[0].trim();
    let cityName = str[1].trim();
    let state = str[2].trim();
    let zipCode = str[3].trim();

    return [address, cityName, state, zipCode];
  };

  const handleChangeWrapper = e => {
    setIsAlertOpen(false);

    return handleChange(e);
  };

  const handleAddressChange = str => {
    let [address, cityName, state, zipCode] = parseAddress(str);

    setFormValues({
      ...formValues,
      address,
      cityName,
      state,
      zipCode,
    });
  };

  const handleFinish = () => {
    setEligibilityContent('eligibility');
  };

  return (
    <Form
      layout="vertical"
      onChange={handleChangeWrapper}
      onFinish={handleFinish}
    >
      <Card>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Address is required' }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            size="large"
            placeholder="Address"
            onChange={handleAddressChange}
            onSearch={handleAutoChange}
          >
            {autosuggestions.map(address => (
              <Option value={formatAddress(address)}>
                {formatAddress(address)}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          hasFeedback
          initialValue={formValues.addressLine2}
          label="Address Line Two"
          name="addressLine2"
        >
          <Input name="addressLine2" />
        </Form.Item>
        <Button htmlType="submit">Next</Button>
      </Card>
    </Form>
  );
}

const formatAddress = address => {
  return `${address.streetLine}, ${address.city}, ${address.state}, ${address.zipcode}`;
};
