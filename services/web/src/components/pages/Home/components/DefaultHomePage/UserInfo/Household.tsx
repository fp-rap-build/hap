import { Typography, Divider, Form, Input, Select, InputNumber } from 'antd';

const { Option } = Select;

const { Title, Paragraph } = Typography;

const Household = ({
  requestData,
  handleRequestChange,
  handleNumOfChildrenChange,
  disabled,
}) => {
  // const AgeInputs = ({ age }) => {
  //   //build array from age
  //   const numberOfAges = Array(age).fill(0).map((_, i) => i);
  // };
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
