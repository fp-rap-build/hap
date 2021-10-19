import { Card, Button, Form, Select, Input } from 'antd';

// Utils
import parseAddress from '../../../../../utils/parseAddress';
import formatAddress from '../../../../../utils/formatAddress';

// Custom hook used to interact with the SmartyStreets autosuggestions API
import useAddressAutoSuggestions from '../../../../../../../../utils/hooks/useAddressAutoSuggestions';

const { Option } = Select;

export default function Index({
  formValues,
  setFormValues,
  handleChange,
  setEligibilityContent,
}) {
  const [autosuggestions, handleSearch] = useAddressAutoSuggestions([]);

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
    <Form layout="vertical" onFinish={handleFinish}>
      <Card>
        <h3>
          Please enter the name of your street below and select your address
          from the dropdown
        </h3>
        {/* if the complaints about entering address are resolved by (beginning of 2022), delete the commented code below */}
        {/* <h3>ENTER Number and first 3 letters of your street name</h3>
        <h3>SEARCH for your address</h3>
        <h3>SELECT your correct address from the list of options</h3> */}

        <Form.Item
          label="Street"
          name="address"
          rules={[{ required: true, message: 'Address is required' }]}
        >
          <Select
            showSearch
            value={formValues.address}
            style={{ width: '100%' }}
            size="large"
            placeholder="123 N Fake St"
            onChange={handleAddressChange}
            onSearch={handleSearch}
          >
            {autosuggestions.map(address => (
              <Option value={formatAddress(address)}>
                {formatAddress(address)}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item hasFeedback label="State">
          <Input value={formValues.state} disabled />
        </Form.Item>

        <Form.Item hasFeedback label="City">
          <Input
            value={formValues.cityName}
            disabled
            onChange={handleChange}
            name="cityName"
          />
        </Form.Item>

        <Form.Item hasFeedback label="Postal code">
          <Input value={formValues.zipCode} disabled name="zipCode" />
        </Form.Item>

        <Form.Item
          hasFeedback
          initialValue={formValues.addressLine2}
          label="Address Line Two"
          name="addressLine2"
        >
          <Input onChange={handleChange} name="addressLine2" />
        </Form.Item>
        <Button htmlType="submit">Next</Button>
      </Card>
    </Form>
  );
}
