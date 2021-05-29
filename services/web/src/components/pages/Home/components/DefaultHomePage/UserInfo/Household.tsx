import EditableNum from '../../common/EditableNum';

import { Typography, Checkbox, Divider, Form, Input, InputNumber } from 'antd';

const { Title, Paragraph } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Household = ({ requestData, handleRequestChange, disabled }) => {
  return (
    <div className="householdInfo userInfoContent">
      <div className="userContentHeading">
        <Title level={4}>Address Information: </Title>
        <Paragraph>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet,
          dolorum! Debitis praesentium natus necessitatibus sit maxime dolore,
          dolorem laboriosam animi dignissimos quis, illo magnam molestias
          maiores at, optio recusandae magni.
        </Paragraph>
      </div>
      <Divider />
      <Form
        {...layout}
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
          label="Children in Household"
          required
          hasFeedback
          rules={[
            {
              required: true,
              pattern: RegExp(/^([0-9][0-9]?)\s*$/),
              message: 'Invalid number of children',
            },
          ]}
        >
          <Input
            disabled={disabled}
            style={{ width: '100%' }}
            name="totalChildren"
          />
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

export default Household;
