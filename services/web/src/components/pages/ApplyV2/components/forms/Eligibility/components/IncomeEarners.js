import { useState, useEffect } from 'react';

import {
  Form,
  Input,
  Card,
  Typography,
  Divider,
  Button,
  InputNumber,
} from 'antd';

const { Text } = Typography;

const Index = ({
  formValues,
  handleChange,
  setFormValues,
  setEligibilityContent,
  onStateChange,
  handleCheckBoxChange,
}) => {
  const [page, setPage] = useState('totalEarners');

  let props = {
    formValues,
    handleChange,
    setEligibilityContent,
    handleChange,
    onStateChange,
    setFormValues,
    handleCheckBoxChange,
    page,
    setPage,
  };

  return <RenderContent page={page} props={props} />;
};

const TotalEarners = ({ setPage, handleChange, formValues, setFormValues }) => {
  const handleTotalEarnersChange = e => {
    let num = e.target.value;

    if (num) {
      if (isNaN(num)) return;

      if (num <= 0 || (num > 20 && num)) return;
    }

    setFormValues({ ...formValues, incomeEarners: num });
  };

  return (
    <Form layout="vertical" onFinish={() => setPage('setIncomes')}>
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
          initialValue={formValues.incomeEarners}
          label={'How many people are receiving income in your household?'}
          rules={[
            {
              required: true,
              pattern: RegExp(/^([1-9][0-9]?)\s*$/),
              message: 'Invalid number',
            },
          ]}
        >
          <Input
            size="large"
            value={formValues.incomeEarners}
            onChange={handleTotalEarnersChange}
            name="incomeEarners"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Button htmlType="submit">Submit</Button>
      </Card>
    </Form>
  );
};

const SetIncomes = ({ formValues }) => {
  const [incomeValues, setIncomeValues] = useState([]);

  let handleChange = (i, income) => {
    let newFormValues = [...incomeValues];

    newFormValues[i]['income'] = income;
    setIncomeValues(newFormValues);
  };

  const onFinish = () => {
    alert('finished');
  };

  useEffect(() => {
    let initialValues = [];

    for (let i = 0; i < formValues.incomeEarners; i++) {
      let name = 'Person ' + (i + 1);

      initialValues.push({ name, income: null });
    }

    setIncomeValues(initialValues);
  }, []);

  useEffect(() => {
    console.log(incomeValues);
  }, [incomeValues]);

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Card headStyle={{ background: ' #472D5B' }}>
        <p>
          Welcome to Family Promise of Spokane's Housing Assistance Application.
        </p>
        <br />
        <h1>Please provide the income for each person inside the household</h1>
        <br />

        {incomeValues.map((element, index) => (
          <Form.Item
            label={`Person ${index + 1}`}
            key={index}
            rules={[{ required: true, message: 'required' }]}
            name={index}
          >
            <InputNumber
              style={{ width: '100%' }}
              name="income"
              addonBefore={'$'}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              formatter={value => {
                return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              }}
              onChange={e => handleChange(index, e)}
              precision={2}
            />
          </Form.Item>
        ))}
        <Button htmlType="submit">Submit</Button>
      </Card>
    </Form>
  );
};

const RenderContent = ({ page, props }) => {
  switch (page) {
    case 'totalEarners':
      return <TotalEarners {...props} />;
    case 'setIncomes':
      return <SetIncomes {...props} />;
    default:
      return <h1>Mistakes have been made</h1>;
  }
};

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default Index;
