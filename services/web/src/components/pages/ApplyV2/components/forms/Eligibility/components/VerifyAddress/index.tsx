import {
  Alert,
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
  message,
} from 'antd';

import { states } from '../../../../../../../../utils/data/states';

import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../../../api/axiosWithAuth';
import { setCurrentUser } from '../../../../../../../../redux/users/userActions';
import { useState } from 'react';

const SmartyStreetsSDK = require('smartystreets-javascript-sdk');
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

// for Server-to-server requests, use this code:
// let authId = process.env.SMARTY_AUTH_ID;
// let authToken = process.env.SMARTY_AUTH_TOKEN;
// const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

// for client-side requests (browser/mobile), use this code:
let key = process.env.REACT_APP_SMARTY_KEY;

const credentials = new SmartyStreetsCore.SharedCredentials(key);

const { Option } = Select;

export default function Index({
  formValues,
  handleChange,
  onStateChange,
  setEligibilityContent,
  currentUser,
  dispatch,
}) {
  const request = useSelector(state => state.requests.request);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleChangeWrapper = e => {
    setIsAlertOpen(false);

    return handleChange(e);
  };

  return (
    <>
      {isAlertOpen && (
        <Alert
          message="Invalid address"
          description="Please double check your address information and try again. If this error still occurs, you may not be elligible for rental assistance"
          type="error"
          showIcon
          closable
          onClose={() => setIsAlertOpen(false)}
        />
      )}

      <Form
        layout="vertical"
        onChange={handleChangeWrapper}
        onFinish={() =>
          verifyAddress(formValues, setEligibilityContent, setIsAlertOpen)
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
    </>
  );
}

const verifyAddress = async (
  formValues,
  setEligibilityContent,
  setIsAlertOpen
) => {
  const { state, cityName, address, addressLine2, zipCode } = formValues;

  const addressInfo = {
    state,
    cityName,
    address,
    addressLine2,
    zipCode,
  };

  let clientBuilder = new SmartyStreetsCore.ClientBuilder(
    credentials
  ).withBaseUrl('https://us-street.api.smartystreets.com/street-address');

  let client = clientBuilder.buildUsStreetApiClient();

  // Documentation for input fields can be found at:
  // https://smartystreets.com/docs/us-street-api#input-fields

  let lookup = new Lookup();
  lookup.street = address;
  lookup.city = cityName;
  lookup.state = state;
  lookup.zipCode = zipCode;

  client
    .send(lookup)
    .then(handleSuccess)
    .catch(handleError);

  function handleSuccess(response) {
    let result = response.lookups.map(lookup => lookup.result);

    // No address was returned, must be invalid
    let isInvalidAddress = result[0].length === 0;

    if (isInvalidAddress) {
      return setIsAlertOpen(true);
    }

    setEligibilityContent('eligibility');
  }

  function handleError(response) {
    console.log(response);
  }
};
