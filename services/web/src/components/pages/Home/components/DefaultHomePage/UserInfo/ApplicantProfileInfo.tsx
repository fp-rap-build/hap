import { Form, Input, Typography, Divider, DatePicker } from 'antd';
import { useEffect } from 'react';
import { formatDate } from '../../../../../../utils/dates/date';

const { Title, Paragraph } = Typography;

const ApplicantProfileInfo = ({
  applicantData,
  setApplicantData,
  disabled,
  handleApplicantChange,
}) => {
  const onDateChange = date => {
    setApplicantData({ ...applicantData, dob: date });
  };

  // useEffect(() => {
  //   alert(applicantData.dob);
  // }, [applicantData]);

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
          name="dob"
          label="Date of Birth ('MM/DD/YYYY)"
          rules={[{ required: true, message: 'Date of Birth is required' }]}
        >
          <DatePicker
            placeholder={formatDate(applicantData.dob)}
            onChange={onDateChange}
            value={applicantData.dob}
            format={'MM/DD/YYYY'}
            disabled={disabled}
          ></DatePicker>
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
