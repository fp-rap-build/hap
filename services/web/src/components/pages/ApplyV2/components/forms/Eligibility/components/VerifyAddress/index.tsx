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
import { useEffect } from 'react';

const SmartyStreetsSDK = require('smartystreets-javascript-sdk');
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocompletePro.Lookup;

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
  setFormValues,
  handleChange,
  onStateChange,
  setEligibilityContent,
  currentUser,
  dispatch,
}) {
  const request = useSelector(state => state.requests.request);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [autosuggestions, setAutosuggestions] = useState([]);

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
              onSearch={e => verifyAddress(formValues, e, setAutosuggestions)}
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
    </>
  );
}

let clientBuilder = new SmartyStreetsCore.ClientBuilder(
  credentials
).withLicenses(['us-autocomplete-pro-cloud']);

let client = clientBuilder.buildUsAutocompleteProClient();

const verifyAddress = async (formValues, address, setAutosuggestions) => {
  if (!address) return;

  const { state, cityName, addressLine2, zipCode } = formValues;

  // Documentation for input fields can be found at:
  // https://smartystreets.com/docs/us-street-api#input-fields

  let lookup = new Lookup(address);

  lookup.maxResults = 5;
  lookup.preferStates = ['WA'];

  client
    .send(lookup)
    .then(function(results) {
      setAutosuggestions(results.result);
    })
    .catch(handleError);

  function handleError(response) {
    alert('Error');
    console.log(response)
  }
};

const formatAddress = address => {
  return `${address.streetLine}, ${address.city}, ${address.state}, ${address.zipcode}`;
};
