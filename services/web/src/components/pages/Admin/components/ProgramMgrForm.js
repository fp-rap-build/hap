import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import styles from '../../../../styles/pages/create.module.css';

import createProgramMgr from '../utils/createProgramMgr';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';

const { Option } = Select;

const INITIAL_VALUES = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  organizationId: null,
};

const ProgramMgrForm = () => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [orgs, setOrgs] = useState([]);

  const fetchOrgs = async () => {
    try {
      let res = await axiosWithAuth().get('/orgs');
      setOrgs(res.data);
    } catch (error) {
      console.error(error);
      alert('error');
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const onChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onOrgChange = value => {
    setFormValues({ ...formValues, organizationId: value });
  };

  const onRoleChange = role => {
    setFormValues({ ...formValues, role });
  };

  const handleSumbit = async e => {
    setLoading(true);

    try {
      await createProgramMgr(formValues);
      setFormValues(INITIAL_VALUES);
      message.success('Successfully created program manager');
    } catch (error) {
      message.error('Failed to create program manager');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create a User:</h2>
      <Form onFinish={handleSumbit} className={styles.form} layout="vertical">
        <Form.Item
          initialValue={formValues.firstName}
          label="First Name"
          name="firstName"
          hasFeedback
          rules={[
            { required: true, message: 'First Name is required' },
            {
              min: 2,
              message: 'First Name must be a minimum of two characters.',
            },
          ]}
        >
          <Input
            name="firstName"
            placeholder="Jane"
            value={formValues.firstName}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.lastName}
          label="Last Name"
          name="lastName"
          hasFeedback
          rules={[
            { required: true, message: 'Last Name is required' },
            {
              min: 3,
              message: 'Last Name must be a minimum of three characters.',
            },
          ]}
        >
          <Input
            name="lastName"
            placeholder="Doe"
            value={formValues.lastName}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.email}
          label="E-mail"
          name="email"
          hasFeedback
          rules={[
            { required: true, message: 'Email is required' },
            {
              type: 'email',
              message: 'Input a valid Email!',
            },
          ]}
        >
          <Input
            name="email"
            placeholder="example@mail.com"
            value={formValues.email}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          initialValue={formValues.password}
          rules={[{ required: true, message: 'required' }]}
          label="Password"
          name="password"
        >
          <Input
            type="password"
            name="password"
            value={formValues.password}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Role"
          name="role"
          rules={[{ required: true, message: 'role is required' }]}
        >
          <Select
            onChange={onRoleChange}
            name="role"
            showSearch
            placeholder="Select a role"
          >
            <Option value={'programManager'}>Program Manager</Option>
            <Option value={'orgAdmin'}>Organization Admin</Option>
            <Option value={'admin'}>Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item
          initialValue={formValues.organization}
          rules={[{ required: true, message: 'required' }]}
          label="Organization"
          name="organization"
        >
          <Select onChange={onOrgChange} placeholder="Select an Organization">
            {orgs.map(org => (
              <Select.Option value={org.id}>{org.organization}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {loading ? 'Creating program manager..' : 'Submit'}
        </Button>
      </Form>
    </div>
  );
};

export default ProgramMgrForm;
