import { useEffect } from 'react';
//Components
import CardTitle from '../../CardTitle';
//UI
import { Card, Typography, Form, Checkbox, Divider } from 'antd';

const { Text } = Typography;

export default function AdditionalInformation({
  role,
  formValues,
  handleCheckBoxChange,
  formConsent,
  setFormConsent,
}) {
  //Bug fix for moving backwards through form and consent not being required again
  useEffect(() => {
    setFormConsent(false);
    //eslint-disable-next-line
  }, []);

  const introMessage = {
    tenant:
      'Please place a checkmark next to all of the statements below that are true for you and/or somebody in your household:',
    landlord:
      'Please place a checkmark next to all of the statements below that are true for your tenant:',
  };

  const setIntroMessage = role => {
    if (role === 'landlord') {
      return introMessage.landlord;
    } else {
      return introMessage.tenant;
    }
  };

  return (
    <div>
      <Card
        title={<CardTitle percentage={80} title="Additional Information" />}
      >
        <Text type="secondary">{setIntroMessage(role)}</Text>
        <Divider dashed />
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

        <Form.Item>
          <Checkbox
            checked={formValues.advocate}
            name="advocate"
            onChange={handleCheckBoxChange}
          >
            Check this box if you are an Advocate completing this request on the
            behalf of somebody else.
          </Checkbox>
        </Form.Item>

        <Divider orientation="left">
          <Text strong>
            Use of this site requires accepting the following terms:
          </Text>
        </Divider>
        <Checkbox name="consent" onChange={() => setFormConsent(!formConsent)}>
          Checking eligibility does not guarantee assistance, and the services
          available on the next page do not come with any warranty{' '}
        </Checkbox>
      </Card>
    </div>
  );
}
