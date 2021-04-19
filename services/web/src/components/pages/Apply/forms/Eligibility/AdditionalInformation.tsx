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
            Have been impacted by Covid.
          </Checkbox>
        </Form.Item>
        <Divider orientation="left">
          <Text strong>Release Consent</Text>
        </Divider>
        <Checkbox name="consent" onChange={() => setFormConsent(!formConsent)}>
          No Warranty/ Release of information consent placeholder{' '}
        </Checkbox>
      </Card>
    </div>
  );
}
