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
        This will help us contact your tenant once you've been approved for
        Rental Assistance
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
        initialValue={formValues.tenantPhoneNumber}
        label="Phone number"
        name="tenantPhoneNumber"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter a phone number',
          },
        ]}
      >
        <Input placeholder="(111)-111-1111" name="tenantPhoneNumber" />
      </Form.Item>
    </Card>
  );
};

const LandlordInfoForm = ({ formValues }) => {
  return (
    <Card title={<Title level={4}>Landlord Information</Title>}>
      <Text type="secondary">
        This will help us contact your landlord once you've been approved for
        Rental Assistance
      </Text>
      <Form.Item
        initialValue={formValues.landlordName}
        label="Name"
        name="landlordName"
        rules={[
          {
            type: 'string',
            required: true,
            message: "Please enter your Land Lord's name",
          },
        ]}
      >
        <Input
          name="landlordName"
          placeholder="Bruce Wayne"
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
        initialValue={formValues.landlordPhoneNumber}
        label="Phone number"
        name="landlordPhoneNumber"
        rules={[
          {
            type: 'string',
            required: true,
            message: 'Please enter a phone number',
          },
        ]}
      >
        <Input placeholder="(111)-111-1111" name="landlordPhoneNumber" />
      </Form.Item>
    </Card>
  );
};
