import { Typography, Divider, Form, Input } from 'antd';

const { Title, Paragraph } = Typography;

const LandlordContact = ({ requestData, handleRequestChange, disabled }) => {
  return (
    <div className="landlordInformation userInfoContent">
      <div className="userContentHeading">
        <Title level={4}>Landlord Contact Information: </Title>
        <Paragraph>
          Please enter any missing information about your Landlord (or Property
          Manager), also, be sure to correct any incorrect entries. Incorrect
          information here drastically increases the amount of time needed to
          process a request for assistance.
        </Paragraph>
      </div>
      <Divider />
      <Form
        layout="vertical"
        name="landlordContact"
        onChange={handleRequestChange}
      >
        <Form.Item
          initialValue={requestData.landlordName}
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
            value={requestData.landlordName}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          initialValue={requestData.landlordAddress}
          label="Address"
          name="landlordAddress"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter Landlord or Property Manager Address',
            },
          ]}
        >
          <Input
            name="landlordAddress"
            value={requestData.landlordAddress}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          initialValue={requestData.landlordAddress2}
          label="Address Line Two"
          name="landlordAddress2"
          rules={[
            {
              type: 'string',
              required: true,
              message:
                'Please enter Landlord or Property Manager Address Line Two',
            },
          ]}
        >
          <Input
            name="landlordAddress2"
            value={requestData.landlordAddess2}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          initialValue={requestData.landlordCity}
          label="City"
          name="landlordCity"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter Landlord or Property Manager City',
            },
          ]}
        >
          <Input
            name="landlordCity"
            value={requestData.landlordCity}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          initialValue={requestData.landlordState}
          label="State"
          name="landlordState"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter Landlord or Property Manager State',
            },
          ]}
        >
          <Input
            name="landlordState"
            value={requestData.landlordState}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          initialValue={requestData.landlordZip}
          label="Zipcode"
          name="landlordZip"
          rules={[
            {
              type: 'string',
              required: true,
              message: 'Please enter Landlord or Property Manager Zipcode',
            },
          ]}
        >
          <Input
            name="landlordZip"
            value={requestData.landlordZip}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item
          initialValue={requestData.landlordEmail}
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
          <Input type="email" name="landlordEmail" disabled={disabled} />
        </Form.Item>

        <Form.Item
          initialValue={requestData.landlordNumber}
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
          <Input name="landlordNumber" disabled={disabled} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default LandlordContact;
