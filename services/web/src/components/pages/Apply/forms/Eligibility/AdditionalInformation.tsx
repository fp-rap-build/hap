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
            Been unemployed for 90+ Days?
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
            checked={formValues.covidFH}
            name="covidFH"
            onChange={handleCheckBoxChange}
          >
            Household has qualified for unemployment or reduction of household income, or incurred additional costs, 
            or experienced financial hardship due directly or indirectly to coronavirus outbreak
            AND 
            Household can demonstrate a risk of experiencing homelessness, or housing instability which may include past due utility or rent notice or eviction notice.
          </Checkbox>
        </Form.Item>
        <Divider orientation="left">
          <Text strong>Release Consent</Text>
        </Divider>
        <Checkbox name="consent" onChange={() => setFormConsent(!formConsent)}>
          Checking eligibility does not gaurantee assistance, and the services available on the next page do not come with any warranty{' '}
        </Checkbox>
      </Card>
    </div>
  );
}
