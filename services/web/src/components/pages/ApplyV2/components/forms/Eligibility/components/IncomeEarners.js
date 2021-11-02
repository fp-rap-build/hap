import { useState } from 'react';

import { states } from '../../../../../../../utils/data/states';

import {
  Form,
  Input,
  Card,
  InputNumber,
  Typography,
  Select,
  Divider,
  Button,
  Checkbox,
} from 'antd';

import { useSelector } from 'react-redux';

const { Option } = Select;

const { Text } = Typography;

const Index = ({
  formValues,
  handleChange,
  setEligibilityContent,
  onStateChange,
  handleCheckBoxChange,
}) => {
  const [page, setPage] = useState('getEarners');

  let props = {
    formValues,
    handleChange,
    setEligibilityContent,
    onStateChange,
    handleCheckBoxChange,
    page,
    setPage,
  };

  return <RenderContent page={page} props={props} />;
};

const TotalEarners = ({ setEligibilityContent, handleChange, formValues }) => {
  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() => setPage('setIncomes')}
    >
      <Card headStyle={{ background: ' #472D5B' }}>
        <p>
          Welcome to Family Promise of Spokane's Housing Assistance Application.
        </p>
        <br />
        <p>
          Please begin by providing information about your household's earned
          income over the last 60 days
        </p>
        <Text type="secondary">
          This will help us determine your eligibility for assistance. We must
          verify information with your landlord to approve any requests.
          <br></br>
          <br />
        </Text>
        <b>
          Providing false or incorrect information here may greatly increase the
          time and work needed to approve your request.
        </b>
        <Divider />

        <Form.Item
          hasFeedback
          name="incomeEarners"
          initialValue={formValues.monthlyIncome}
          label={'How many people are earning income in your household?'}
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/
              ),
              message: 'Invalid number',
            },
          ]}
        >
          <Input size="large" name="monthlyIncome" style={{ width: '100%' }} />
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Card>
    </Form>
  );
};

const RenderContent = ({ page, props }) => {
  switch (page) {
    case 'getEarners':
      return <TotalEarners {...props} />;
  }
};

const updateLandlordInfo = async () => {};

export default Index;
