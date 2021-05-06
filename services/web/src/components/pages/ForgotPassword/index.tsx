import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { clearErrorMessage, logIn } from '../../../redux/users/userActions';
import styles from '../../../styles/pages/login.module.css';

export default function Index() {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.global.isLoading);

  const errorMessage = useSelector(state => state.user.errorMessage);

  const history = useHistory();

  const onFinish = async (values: any) => {
    dispatch(logIn(values, history));
  };

  const clearErrors = () => {
    if (errorMessage) {
      dispatch(clearErrorMessage());
    }
  };

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
