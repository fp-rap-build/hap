import { Form, Input } from 'antd';

const ApplicantProfileInfo = ({
  applicantData,
  disabled,
  handleApplicantChange,
}) => {
  return (
    <div>
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
