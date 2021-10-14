import { Form, Input, Card, Typography, Select, Divider, Button } from 'antd';

import { useSelector } from 'react-redux';

import {
  setCurrentUser,
  setErrorMessage,
} from '../../../../../redux/users/userActions';

import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

// Utils
import parseAddress from '../../utils/parseAddress';
import formatAddress from '../../utils/formatAddress';

// Custom hook used to interact with the SmartyStreets autosuggestions API
import useAddressAutoSuggestions from '../../../../../utils/hooks/useAddressAutoSuggestions';

const { Option } = Select;

const { Text } = Typography;

const Landlord = ({
  formValues,
  handleChange,
  setCurrentContent,
  setFormValues,
  currentUser,
  dispatch,
}) => {
  const request = useSelector(state => state.requests.request);

  const [autosuggestions, handleSearch] = useAddressAutoSuggestions([]);

  const handleAddressChange = str => {
    let [
      landlordAddress,
      landlordCity,
      landlordState,
      landlordZip,
    ] = parseAddress(str);

    setFormValues({
      ...formValues,
      landlordAddress,
      landlordCity,
      landlordState,
      landlordZip,
    });
  };

  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() => {
        formValues.landlordEmail = formValues.landlordEmail.toLowerCase(); // landlord email capitalization fix
        updateLandlordInfo(
          formValues,
          setCurrentContent,
          request,
          currentUser,
          dispatch
        );
      }}
    >
      <Card headStyle={{ background: ' #472D5B' }}>
        <p>
          Welcome to Family Promise of Spokane's Housing Assistance Application.
        </p>
        <br />
        <p>
          Please begin by providing information about your Landlord or Property
          Manager.
        </p>
        <Text type="secondary">
          This will help us contact your landlord. We must verify information
          with your landlord to approve any requests.
          <br></br>
          <br />
        </Text>
        <b>
          Providing false or incorrect information here may greatly increase the
          time and work needed to approve your request.
        </b>
        <Divider />

        <Form.Item
          initialValue={formValues.landlordName}
          label="Name"
          name="landlordName"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter Landlord or Property Manager Name',
            },
          ]}
        >
          <Input
            name="landlordName"
            placeholder="Landlord Name"
            value={formValues.landlordName}
          />
        </Form.Item>

        <Form.Item
          label="Address"
          rules={[{ required: true, message: 'Address is required' }]}
          name="landlordAddress"
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Address"
            defaultValue={formValues.landlordAddress}
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
          initialValue={formValues.landlordAddress2}
          label="Address Line Two"
          name="landlordAddress2"
        >
          <Input name="landlordAddress2" />
        </Form.Item>

        <Form.Item
          initialValue={formValues.landlordEmail}
          label="Email"
          name="landlordEmail"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input
            type="email"
            placeholder="wayne@gmail.com"
            name="landlordEmail"
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.landlordNumber}
          label="Phone number"
          name="landlordNumber"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter a phone number',
            },
          ]}
        >
          <Input placeholder="(111)-111-1111" name="landlordNumber" />
        </Form.Item>
        <Button htmlType="submit">Next</Button>
      </Card>
    </Form>
  );
};

const updateLandlordInfo = async (
  formValues,
  setCurrentContent,
  request,
  currentUser,
  dispatch
) => {
  const {
    landlordName,
    landlordState,
    landlordCity,
    landlordAddress,
    landlordAddress2,
    landlordZip,
    landlordEmail,
    landlordNumber,
  } = formValues;

  const landlordInfo = {
    landlordName,
    landlordState,
    landlordCity,
    landlordAddress,
    landlordAddress2,
    landlordZip,
    landlordEmail,
    landlordNumber,
  };

  try {
    await axiosWithAuth().put(`/requests/${request.id}`, landlordInfo);

    if (currentUser.applicationStep === 'landlord') {
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

    setErrorMessage(
      'Unable to update landlord info. Please report this or try again'
    );
  } finally {
  }
};

export default Landlord;
