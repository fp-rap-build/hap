import React, { useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from '../../../styles/pages/login.module.css';
import { setLoading } from '../../../redux/global/globalActions';
import { axiosWithAuth } from '../../../api/axiosWithAuth';

export default function Index() {
  const { resetToken } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [finished, setFinished] = useState(false);

  const history = useHistory();

  const onFinish = async (values: any) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      return setErrorMessage('Passwords do not match');
    }

    setIsLoading(true);
    try {
      await axiosWithAuth().post(`/auth/resetPassword/${resetToken}`, {
        password,
      });

      setFinished(true);
    } catch (error) {
      const { status } = error.response;

      if (status === 401) {
        setErrorMessage('Your reset token is invalid / expired');
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
            name="password"
            rules={[
              { required: true, message: 'Please input your new password' },
            ]}
            label="Please enter your new password"
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your password' },
            ]}
            label="Confirm password"
          >
            <Input.Password placeholder="Confirm Password" size="large" />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              {isLoading ? 'Loading..' : 'Update Password'}
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
  <div
    style={{
      width: '100%',
      height: '60vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h1>Your password has been reset</h1>
    <Link to="/login">Back to Login</Link>
  </div>
);
