import { Typography, Checkbox, Form, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const DemoInfo = ({ requestData, handleRequestChange, disabled }) => {
  return (
    <>
      <div className="demographicInfo userInfoContent">
        <div className="userContentHeading">
          <Title level={4}>Demographic Information: </Title>
          <Paragraph>
            This demographic information does not affect your eligibility for
            services. Please provide the race/ethnicity for members of your
            household.
          </Paragraph>
        </div>
        <Divider />
        <Form {...layout}>
          <Form.Item>
            <Checkbox
              checked={requestData.hispanic}
              disabled={disabled}
              name="hispanic"
              onChange={handleRequestChange}
            >
              Hispanic/ Latino
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={requestData.asian}
              disabled={disabled}
              onChange={handleRequestChange}
              name="asian"
            >
              Asian
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={requestData.black}
              disabled={disabled}
              onChange={handleRequestChange}
              name="black"
            >
              Black or African American
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={requestData.pacific}
              disabled={disabled}
              onChange={handleRequestChange}
              name="pacific"
            >
              Native Hawaiian or Other Pacific Islander
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={requestData.white}
              disabled={disabled}
              onChange={handleRequestChange}
              name="white"
            >
              White
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={requestData.native}
              disabled={disabled}
              onChange={handleRequestChange}
              name="native"
            >
              Native American or Alskan Native
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={requestData.demoNotSay}
              disabled={disabled}
              onChange={handleRequestChange}
              name="demoNotSay"
            >
              Rather Not Say
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default DemoInfo;
