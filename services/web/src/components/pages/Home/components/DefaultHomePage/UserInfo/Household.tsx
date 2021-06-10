import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { Typography, Divider, Form, Input, Select, InputNumber } from 'antd';
import { valueScaleCorrection } from 'framer-motion/types/render/dom/projection/scale-correction';

const { Option } = Select;

const { Title, Paragraph } = Typography;

const Household = ({
  requestData,
  handleRequestChange,
  handleNumOfChildrenChange,
  disabled,
}) => {
  //Handeling Ages
  //Depending on size may need to move to its own module

  const currentUser = useSelector(state => state.user.currentUser);

  const [childrensAges, setChildrensAges] = useState([]);

  //Pretty sure this is useless for our use case
  const handleEnter = e => {
    console.log(e);
  };

  const handleChange = id => value => {
    setChildrensAges(
      childrensAges.map(childAge => {
        if (childAge.id === id) {
          return { ...childAge, age: value };
        } else {
          return childAge;
        }
      })
    );
  };

  //Fetch Ages (from current User)
  const fetchAges = async () => {
    try {
      const householdAges = await axiosWithAuth()
        .get(`/ages/user/${currentUser.id}`)
        .then(res => res.data);

      const builtChildrenAges = [];

      householdAges.forEach(age => {
        if (age.role === 'child') {
          builtChildrenAges.push(age);
        }
      });

      setChildrensAges(builtChildrenAges);
    } catch (error) {
      alert('error fetching ages');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAges();
    //eslint-disable-next-line
  }, []);

  const ChildrensAges = () => {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          {childrensAges.map(age => (
            <div style={{ marginRight: '5%' }}>
              <Form.Item label={'Child Age'}>
                <InputNumber
                  disabled={disabled}
                  defaultValue={age.age}
                  max={18}
                  onPressEnter={handleEnter}
                  onChange={handleChange(age.id)}
                />
              </Form.Item>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="householdInfo userInfoContent">
      <div className="userContentHeading">
        <Title level={4}>Household Information: </Title>
        <Paragraph>
          More information about your household allows us to check for various
          programs you may be eligible for.
        </Paragraph>
      </div>
      <Divider />
      <Form
        layout="vertical"
        name="householdInformation"
        onChange={handleRequestChange}
      >
        <Form.Item
          name="familySize"
          initialValue={requestData.familySize}
          label="Residents"
          required
          hasFeedback
          rules={[
            {
              required: true,
              pattern: RegExp(/^([1-9][0-9]?)\s*$/),
              message: 'Invalid number of residents',
            },
          ]}
        >
          <Input
            disabled={disabled}
            style={{ width: '100%' }}
            name="familySize"
          />
        </Form.Item>
        <Form.Item
          name="totalChildren"
          initialValue={requestData.totalChildren}
          label="Number of Children in Household"
          required
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Number of children required',
            },
          ]}
        >
          <Select
            disabled={disabled}
            onChange={handleNumOfChildrenChange}
            style={{ width: '100%' }}
          >
            {numChildrenArray.map(num => (
              <Option value={num}>{num}</Option>
            ))}
          </Select>
        </Form.Item>
        <ChildrensAges />
        <Form.Item
          hasFeedback
          name="monthlyIncome"
          initialValue={requestData.monthlyIncome}
          label={'Monthly Income'}
          rules={[
            {
              required: true,
              pattern: RegExp(
                // forgive me
                /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
              ),
              message: 'Invalid income',
            },
          ]}
        >
          <Input
            disabled={disabled}
            name="monthlyIncome"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="monthlyRent"
          initialValue={requestData.monthlyRent}
          label={'Monthly Rent'}
          rules={[
            {
              required: true,
              pattern: RegExp(
                // forgive me
                /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
              ),
              message: 'Invalid rent',
            },
          ]}
        >
          <Input
            disabled={disabled}
            name="monthlyRent"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="owed"
          initialValue={requestData.owed}
          label={'Total Amount Owed'}
          rules={[
            {
              required: true,
              pattern: RegExp(
                // forgive me
                /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
              ),
              message: 'Invalid total',
            },
          ]}
        >
          <Input disabled={disabled} name="owed" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="amountRequested"
          initialValue={requestData.amountRequested}
          label={'Amount of Assistance Requested'}
          rules={[
            {
              required: true,
              pattern: RegExp(
                // forgive me
                /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
              ),
              message: 'Invalid total',
            },
          ]}
        >
          <Input
            disabled={disabled}
            name="amountRequested"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

const numChildrenArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default Household;
