import { Form, Input, Typography, Divider, DatePicker } from 'antd';

const { Title, Paragraph } = Typography;

const formatDate = date => {
  if (!date) return 'YYYY / MM / DD';

  const splitDate = date.split('T');
  return splitDate[0];
};

const ApplicantProfileInfo = ({
  applicantData,
  disabled,
  handleApplicantChange,
  handleDateChange,
}) => {
  return (
    <div className="addressInformation userInfoContent">
      <div className="userContentHeading">
        <Title level={4}>Applicant Information: </Title>
        <Paragraph>
          Check your personal information below and make changes if necessary.
        </Paragraph>
      </div>
      <Divider />
      <Form
        style={{
          marginBottom: '3rem',
        }}
        name="applicantInfo"
        layout="vertical"
        onChange={handleApplicantChange}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          initialValue={applicantData.firstName}
        >
          <Input disabled={disabled} name="firstName" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          initialValue={applicantData.lastName}
        >
          <Input disabled={disabled} name="lastName" />
        </Form.Item>

        <Form.Item
          label="Date Of Birth"
          name="dob"
          initialValue={formatDate(applicantData.dob)}
        >
          <Input disabled={disabled} name="dob" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          initialValue={applicantData.email}
        >
          <Input disabled={true} name="email" />
        </Form.Item>

        <Form.Item label="Role" name="role" initialValue={applicantData.role}>
          <Input disabled={true} name="role" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplicantProfileInfo;
