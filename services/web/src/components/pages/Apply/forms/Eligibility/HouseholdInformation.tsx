//Components
import CardTitle from '../../CardTitle';
//UI
import { Card, Form, Input } from 'antd';

export default function HouseHoldInformation({ formValues, role }) {
  return (
    <div>
      <Card title={<CardTitle percentage={40} title="Household Information" />}>
        <Form.Item
          name="familySize"
          initialValue={formValues.familySize}
          label=" Residents"
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
            style={{ width: '100%' }}
            name="familySize"
            value={formValues.familySize}
          />
        </Form.Item>

        <Form.Item
          name="totalChildren"
          initialValue={formValues.totalChildren}
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
            style={{ width: '100%' }}
            name="totalChildren"
            value={formValues.totalChildren}
          />
        </Form.Item>

        <Form.Item
          name="beds"
          initialValue={formValues.beds}
          label="Total Bedrooms"
          required
          hasFeedback
          rules={[
            {
              required: true,
              pattern: RegExp(/^([0-9][0-9]?)\s*$/),
              message: 'Invalid number of bedrooms',
            },
          ]}
        >
          <Input
            style={{ width: '100%' }}
            name="beds"
            value={formValues.beds}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="monthlyIncome"
          initialValue={formValues.monthlyIncome}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Monthly Income'
              : 'Monthly Income'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/
            ),
              message: 'Invalid income',
            },
          ]}
        >
          <Input name="monthlyIncome" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="monthlyRent"
          initialValue={formValues.monthlyRent}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Monthly Rent'
              : 'Monthly Rent'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/),
              message: 'Invalid rent',
            },
          ]}
        >
          <Input name="monthlyRent" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="owed"
          initialValue={formValues.owed}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Total Amount Owed'
              : 'Total owed'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/),
              message: 'Invalid total',
            },
          ]}
        >
          <Input name="owed" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          hasFeedback
          name="amountRequested"
          initialValue={formValues.amountRequested}
          label={
            formValues.role === 'landlord'
              ? 'Tenants Total Amount Requested'
              : 'Total requested'
          }
          rules={[
            {
              required: true,
              pattern: RegExp(
                // looks for at least 1 digit with optional decimal point
                /\d+(?:\.\d+)?/),
              message: 'Invalid total',
            },
          ]}
        >
          <Input name="amountRequested" style={{ width: '100%' }} />
        </Form.Item>
      </Card>
    </div>
  );
}
