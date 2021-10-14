import { Card, Button, Form, Select, Input } from 'antd';

// Utils
import parseAddress from '../../../../../utils/parseAddress';
import formatAddress from '../../../../../utils/formatAddress';

// Custom hook used to interact with the SmartyStreets autosuggestions API
import useAddressAutoSuggestions from '../../../../../../../../utils/hooks/useAddressAutoSuggestions';
import { BoldOutlined, ItalicOutlined } from '@ant-design/icons';
import { TextFormat } from '@material-ui/icons';

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
          EnterNumber and first 3 letters of street name to begin searching for
          your address.
        </h3>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Address is required' }]}
        >
          <Select
            showSearch
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

        <Form.Item
          hasFeedback
          initialValue={formValues.addressLine2}
          label="Address Line Two"
          name="addressLine2"
        >
          <Input
            onChange={handleChange}
            name="addressLine2"
            placeholder="Apt 109"
          />
        </Form.Item>
        <Button htmlType="submit">Next</Button>
      </Card>
    </Form>
  );
}
