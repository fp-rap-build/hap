import { Form, Input, Card, Typography, Divider } from 'antd';

const { Title, Text } = Typography;

export default function SecondaryContact({ formValues, setFormValues }) {
  return (
    <>
      {formValues.role === 'tenant' ? (
        <LandlordInfoForm formValues={formValues} />
      ) : (
        <TenantInfoForm formValues={formValues} />
      )}
    </>
  );
}

const TenantInfoForm = ({ formValues }) => {
  return (
    <Card title={<Title level={4}>Tenant Information</Title>}>
      <Text type="secondary">
        This will help us contact your tenant; a step required to complete your
        request for Rental Assistance.
      </Text>
      <Divider dashed />
      <Form.Item
        initialValue={formValues.tenantName}
        label="Name"
        name="tenantName"
        rules={[
          {
            type: 'string',
            required: true,
            message: "Please enter your Tenant's name",
          },
        ]}
      >
        <Input
          name="tenantName"
          placeholder="Bruce Wayne"
          value={formValues.tenantName}
        />
      </Form.Item>

      <Form.Item
        initialValue={formValues.tenantEmail}
        label="Email"
        name="tenantEmail"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please enter a valid email',
          },
        ]}
      >
        <Input type="email" placeholder="wayne@gmail.com" name="tenantEmail" />
      </Form.Item>

      <Form.Item
        initialValue={formValues.tenantNumber}
        label="Phone number"
        name="tenantNumber"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter a phone number',
          },
        ]}
      >
        <Input placeholder="(111)-111-1111" name="tenantNumber" />
      </Form.Item>
    </Card>
  );
};

const LandlordInfoForm = ({ formValues }) => {
  return (
    <Card title={<Title level={4}>Landlord Information</Title>}>
      <Text type="secondary">
        This will help us contact your landlord. We must verify information with
        your landlord to approve any requests. Providing false or incorrect
        information here may greatly increase the time and work needed to
        approve your request.
      </Text>
      <Divider />

      <Form.Item
        initialValue={formValues.landlordName}
        label="Name"
        name="landlordName"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter Landlord or Property Manager Name',
          },
        ]}
      >
        <Input
          name="landlordName"
          placeholder="Landlord Name"
          value={formValues.landlordName}
        />
      </Form.Item>

      <Form.Item
        initialValue={formValues.landlordEmail}
        label="Email"
        name="landlordEmail"
        rules={[
          {
            type: 'email',
            required: true,
            message: 'Please enter a valid email',
          },
        ]}
      >
        <Input
          type="email"
          placeholder="wayne@gmail.com"
          name="landlordEmail"
        />
      </Form.Item>

      <Form.Item
        initialValue={formValues.landlordNumber}
        label="Phone number"
        name="landlordNumber"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter a phone number',
          },
        ]}
      >
        <Input placeholder="(111)-111-1111" name="landlordNumber" />
      </Form.Item>
    </Card>
  );
};
