import { Form, Input, Card, Typography, Divider, Button, Checkbox } from 'antd';

const { Text } = Typography;

const Index = ({
  formValues,
  handleChange,
  setEligibilityContent,
  handleCheckBoxChange,
}) => {
  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() => setEligibilityContent('programs')}
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
                /\d+(?:\.\d+)?/
              ),
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
                /\d+(?:\.\d+)?/
              ),
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
                /\d+(?:\.\d+)?/
              ),
              message: 'Invalid total',
            },
          ]}
        >
          <Input name="amountRequested" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.minorGuest}
            name="minorGuest"
            onChange={handleCheckBoxChange}
          >
            Household has at least one minor (17 or younger) or at least one
            person is pregnant?
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={formValues.unEmp90}
            name="unEmp90"
            onChange={handleCheckBoxChange}
          >
            Been unemployed for 90+ consecutive days as of today?
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.foodWrkr}
            name="foodWrkr"
            onChange={handleCheckBoxChange}
          >
            At least one person in the household worked in the food service
            industry at any time since January 1, 2020?
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={formValues.qualifiedForUnemployment}
            name="qualifiedForUnemployment"
            onChange={handleCheckBoxChange}
          >
            <p>
              Qualified for unemployment or experienced a reduction in household
              income?
            </p>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={formValues.covidFH}
            name="covidFH"
            onChange={handleCheckBoxChange}
          >
            <p>
              Incurred new expenses or experienced a financial hardship due to
              COVID?
            </p>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.proofOfRisk}
            name="proofOfRisk"
            onChange={handleCheckBoxChange}
          >
            <p>
              Can demonstrate a risk of being homeless or being displaced
              because of eviction notices or past due utilities?
            </p>
          </Checkbox>
        </Form.Item>
        <Button htmlType="submit">Check your Eligibilty</Button>
      </Card>
    </Form>
  );
};

export default Index;
