//Components
import CardTitle from '../../CardTitle';
//UI
import { Card, Typography, Divider, Form, Checkbox } from 'antd';
const { Text } = Typography;

export default function Demographics({
  role,
  handleCheckBoxChange,
  formValues,
}) {
  const introMessage = {
    tenant:
      'Please place a checkmark next to all of the groups below that are true for you and/or somebody in your household:',
    landlord:
      'Please place a checkmark next to all of the groups below that are true for your tenant:',
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
        title={<CardTitle percentage={60} title="Demographic Information" />}
      >
        <Text type="secondary">{setIntroMessage(role)}</Text>
        <Divider dashed />
        <Form.Item>
          <Checkbox
            checked={formValues.hispanic}
            name="hispanic"
            onChange={handleCheckBoxChange}
          >
            Hispanic/ Latino
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.asian}
            onChange={handleCheckBoxChange}
            name="asian"
          >
            Asian
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.black}
            onChange={handleCheckBoxChange}
            name="black"
          >
            Black or African American
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.pacific}
            onChange={handleCheckBoxChange}
            name="pacific"
          >
            Native Hawaiian or Other Pacific Islander
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.white}
            onChange={handleCheckBoxChange}
            name="white"
          >
            White
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.native}
            onChange={handleCheckBoxChange}
            name="native"
          >
            Native American or Alskan Native
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.demoNotSay}
            onChange={handleCheckBoxChange}
            name="demoNotSay"
          >
            Rather Not Say
          </Checkbox>
        </Form.Item>
      </Card>
    </div>
  );
}
