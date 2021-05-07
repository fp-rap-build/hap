import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../../../styles/pages/login.module.css';
import { setLoading } from '../../../redux/global/globalActions';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import passwordStyles from '../../../styles/pages/password.module.css';

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [finished, setFinished] = useState(false);

  const history = useHistory();

  const onFinish = async (values: any) => {
    const { email } = values;

    setIsLoading(true);
    try {
      await axiosWithAuth().post('/auth/forgotPassword', { email });

      setFinished(true);
    } catch (error) {
      if (!error.response) {
        setErrorMessage('Internal server error');
      }

      const { status } = error.response;

      if (status === 404) {
        setErrorMessage(error.response.data.message);
      }

      if (status === 500) {
        setErrorMessage('Internal server error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setErrorMessage('');
  };

  if (finished) {
    return <FinishedMessage />;
  }

  return (
    <div>
      <Form
        name="normal_login"
        className={styles.container}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // Remove error messages after the user types
        onChange={clearErrors}
        layout="vertical"
      >
        <div className={styles.fields}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email' }]}
            label="Please enter your email address"
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email"
              size="large"
            />
          </Form.Item>

          <Link className="login-form-forgot" to="/login">
            Back to login
          </Link>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              {isLoading ? 'Loading..' : 'Submit'}
            </Button>
          </Form.Item>

          {/* Error messages */}
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </Form>
    </div>
  );
}

const FinishedMessage = () => (
  <div className={passwordStyles.container}>
    <h1>Please check your email for the reset link</h1>
  </div>
);
