import { states } from '../../../../../utils/data/states';

import {
  Form,
  Input,
  Card,
  InputNumber,
  Typography,
  Select,
  Divider,
  Button,
} from 'antd';

import { updateRequest } from '../../../../../api';

import { useSelector } from 'react-redux';
import {
  setCurrentUser,
  setErrorMessage,
} from '../../../../../redux/users/userActions';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

const { Option } = Select;

const { Text } = Typography;

const Landlord = ({
  formValues,
  handleChange,
  setCurrentContent,
  onLandlordStateChange,
  currentUser,
  dispatch,
}) => {
  const request = useSelector(state => state.requests.request);

  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() =>
        updateLandlordInfo(
          formValues,
          setCurrentContent,
          request,
          currentUser,
          dispatch
        )
      }
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
          hasFeedback
          initialValue={formValues.landlordState}
          label="State"
          name="landlordState"
          rules={[{ required: true, message: 'State is required' }]}
        >
          <Select
            onChange={onLandlordStateChange}
            showSearch
            placeholder="Select a state"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {states.map(landlordState => (
              <Option value={landlordState}>{landlordState}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          hasFeedback
          initialValue={formValues.landlordCity}
          label="City"
          name="landlordCity"
          rules={[
            { required: true, min: 3, message: 'City is required' },
            {
              pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
              message: 'Enter a valid City Name',
            },
          ]}
        >
          <Input name="landlordCity" value={formValues.landlordCity} />
        </Form.Item>

        <Form.Item
          hasFeedback
          initialValue={formValues.landlordAddress}
          label="Address"
          name="landlordAddress"
          rules={[
            { required: true, message: 'Address is required' },
            {
              pattern: RegExp(/^[A-Za-z0-9'.-\s,#]*$/),
              message: 'Enter a valid City Name',
            },
          ]}
        >
          <Input name="landlordAddress" />
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
          hasFeedback
          initialValue={formValues.landlordZip}
          label="Postal Code"
          name="landlordZip"
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
          <InputNumber style={{ width: '100%' }} name="landlordZip" />
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
        .put('/users/me', { applicationStep: 'address' })
        .then(res => {
          dispatch(setCurrentUser(res.data.user));
        });
    }

    setCurrentContent('address');
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
