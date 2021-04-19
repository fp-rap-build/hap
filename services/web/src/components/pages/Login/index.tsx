import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
    <Form
      name="normal_login"
      className={styles.container}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // Remove error messages after the user types
      onChange={clearErrors}
    >
      <div className={styles.fields}>
        {/* Email */}
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        {/* <a className="login-form-forgot" href="">
          Forgot password?
        </a> */}

        {/* Submit */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.loginButton}
          >
            {isLoading ? 'Logging in..' : 'Login'}
          </Button>
        </Form.Item>

        {/* Error messages */}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </Form>
  );
}
