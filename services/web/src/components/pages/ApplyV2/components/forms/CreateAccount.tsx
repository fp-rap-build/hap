import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';

import FPTitle from '../../../Apply/FPTitle';

import {
  Form,
  Input,
  Card,
  Typography,
  Divider,
  Button,
  DatePicker,
} from 'antd';

import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

import { setCurrentUser } from '../../../../../redux/users/userActions';

import { setCurrentRequest } from '../../../../../redux/requests/requestActions';

const { Text } = Typography;

export default function CreateAccount({
  formValues,
  handleChange,
  setCurrentContent,
  errorMessage,
  setErrorMessage,
  onDateChange,
}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() =>
        onAccountSubmit(
          dispatch,
          formValues,
          setErrorMessage,
          setLoading,
          setCurrentContent,
          setCurrentRequest
        )
      }
    >
      <Card headStyle={{ background: ' #472D5B' }}>
        <p>URGENT NOTICE: </p>
        <br />
        <p>
          Creating a Housing Assistance Portal account does not submit a request
          for assistance.
        </p>

        <br />
        <p>
          {' '}
          Once you create your account, please begin uploading supporting
          documents as directed on your user dashboard.{' '}
        </p>
        <p>
          <br />
          All documents must be submitted before the Housing Assistance Team can
          begin processing your request for assistance.
        </p>

        <Divider dashed />

        <Form.Item
          hasFeedback
          initialValue={formValues.firstName}
          label="First Name"
          name="firstName"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter your first name',
            },
          ]}
        >
          <Input
            name="firstName"
            placeholder="Jane"
            value={formValues.firstName}
          />
        </Form.Item>
        <Form.Item
          initialValue={formValues.lastName}
          label="Last Name"
          name="lastName"
          hasFeedback
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter your last name',
            },
          ]}
        >
          <Input
            name="lastName"
            placeholder="Doe"
            value={formValues.lastName}
          />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth (YYYY-MM-DD)"
          rules={[{ required: true, message: 'Date of Birth is required' }]}
        >
          <DatePicker
            placeholder="1981-02-13"
            onChange={onDateChange}
            value={formValues.dob}
          ></DatePicker>
        </Form.Item>

        <Form.Item
          hasFeedback
          initialValue={formValues.email}
          label="E-mail"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please enter a valid email',
            },
          ]}
        >
          <Input
            name="email"
            placeholder="example@mail.com"
            value={formValues.email}
          />
        </Form.Item>
        <Form.Item
          initialValue={formValues.phoneNumber}
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter a phone number',
            },
          ]}
        >
          <Input placeholder="(111)-111-1111" name="phoneNumber" />
        </Form.Item>

        <Form.Item
          hasFeedback
          initialValue={formValues.password}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              min: 10,
              message: 'Password must be at least 10 characters',
            },
          ]}
        >
          <Input type="password" name="password" value={formValues.password} />
        </Form.Item>
        <Form.Item
          initialValue={formValues.confirmPassword}
          label="Confirm password"
          name="confirmPassword"
        >
          <Input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
          />
        </Form.Item>
        <CreateAccountButton loading={loading} />
        {errorMessage && (
          <div style={{ marginTop: '1rem' }}>
            <Text type="danger">{errorMessage}</Text>
          </div>
        )}
      </Card>
    </Form>
  );
}

const CreateAccountButton = ({ loading }) => {
  return (
    <Button size="large" htmlType="submit">
      {loading ? 'Loading..' : 'Create Account'}
    </Button>
  );
};

const onAccountSubmit = async (
  dispatch,
  formValues,
  setErrorMessage,
  setLoading,
  setCurrentContent,
  setCurrentRequest
) => {
  for (let key in formValues) {
    let value = formValues[key];
    if (typeof value === 'string') {
      formValues[key] = formValues[key].trim();
    }
  }

  const {
    state,
    cityName,
    address,
    addressLine2,
    zipCode,
    monthlyIncome,
    monthlyRent,
    owed,
    amountRequested,
    proofOfRisk,
    covidFH,
    qualifiedForUnemployment,
    foodWrkr,
    unEmp90,
    phoneNumber,
    minorGuest,
  } = formValues;

  // Values directly attached to their account
  const user = {
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    password: formValues.password,
    role: formValues.role,
    dob: formValues.dob,
    gender: formValues.gender,
  };

  const tenantNumber = phoneNumber; // patch to get tenant phone # in BE

  const request = {
    monthlyIncome,
    monthlyRent,
    owed,
    amountRequested,
    proofOfRisk,
    covidFH,
    qualifiedForUnemployment,
    foodWrkr,
    tenantNumber,
    unEmp90,
    address: {
      state,
      cityName,
      address,
      addressLine2,
      zipCode,
    },
  };

  setLoading(true);

  try {
    // Register an account
    let res = await axiosWithAuth().post('/auth/register', user);

    // Login
    const token = res.data.token;
    const currentUser = res.data.user;

    localStorage.setItem('token', token);

    dispatch(setCurrentUser(currentUser));

    // Submit am empty request
    let newRequest = await axiosWithAuth()
      .post('/requests', request)
      .then(res => dispatch(setCurrentRequest(res.data)));

    setCurrentContent('landlord');
  } catch (error) {
    // #TODO: Better error handling
    const message = error?.response?.data?.message || 'Internal server error';

    setErrorMessage(message);
  } finally {
    setLoading(false);
  }
};
