import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { clearErrorMessage } from '../../../redux/users/userActions';

import { register } from '../../../redux/users/userActions';

import { setErrorMessage } from '../../../redux/global/globalActions';

import useWindowDimensions from '../../../utils/useWindowDimensions';

import goldStar from '../../../assets/FP-star-gold.png';

import { Form, Input, Typography, Card, Image, Button } from 'antd';

const { Title, Text } = Typography;

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'landlord',
  organizationId: 1,
};

export default function Index() {
  const dispatch = useDispatch();

  const history = useHistory();

  const isLoading = useSelector(state => state.global.isLoading);

  const errorMessage = useSelector(state => state.user.errorMessage);

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = e => {
    // Clean up any error message after the user types
    if (errorMessage) {
      dispatch(clearErrorMessage());
    }

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (errorMessage) return;

    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      dispatch(setErrorMessage('Passwords must match'));
      return;
    }

    if (formValues.password.length < 10) {
      dispatch(setErrorMessage('Password must be at least 10 characters'));
      return;
    }

    dispatch(register(formValues, history));
  };

  //Plan
  /* 
  - Build out login and signup components w/ intuitive API
  - Set up state to handle succesful login/ register (test on login first)
  - Create middleware to check by email --- so they can only register if one of their 
    tenants includes their email?
  - 
  */

  return (
    <div>
      <Card
        title={<FPTitle title="Landlord Account Registration" />}
        headStyle={{ background: ' #472D5B' }}
        style={{ width: '40rem', margin: '2rem auto 0' }}
      >
        <Form layout="vertical" onChange={handleChange} onFinish={handleSubmit}>
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
            <Input
              type="password"
              name="password"
              value={formValues.password}
            />
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

          {errorMessage && <Text type="danger">{errorMessage}</Text>}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const FPTitle = ({ title }) => {
  const { width } = useWindowDimensions();

  return (
    <div className="fpCardTitle">
      <Image width={'2rem'} src={goldStar} />
      <Title
        level={width < 400 ? 5 : 4}
        style={{ color: 'white', marginLeft: '5%' }}
      >
        {title}
      </Title>
    </div>
  );
};
