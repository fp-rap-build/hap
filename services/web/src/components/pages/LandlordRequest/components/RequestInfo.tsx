import { Descriptions, Typography } from 'antd';

const { Title } = Typography;

export default function RequestInfo({ request }) {
  console.log('RequestInfo request: ', request);

  return (
    <div>
      <Title level={3} underline>
        Request Information
      </Title>
      <Descriptions title="Tenant Information:">
        <Descriptions.Item label="Tenant Name">
          {request.firstName} {request.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{request.email}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {request.phoneNumber}
          {/* changed from request.email....? */}
        </Descriptions.Item>
        <Descriptions.Item label="Amount Owed/ Requested">
          ${request.amountRequested}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Address/ Unit Information:">
        <Descriptions.Item label="Address">{request.address}</Descriptions.Item>
        {request.addressLine2 ? (
          <Descriptions.Item label="Address Line Two">
            {request.addressLine2}
          </Descriptions.Item>
        ) : null}
        <Descriptions.Item label="City">{request.cityName}</Descriptions.Item>
        <Descriptions.Item label="State">{request.state}</Descriptions.Item>
        <Descriptions.Item label="Zip Code">
          {request.zipCode}
        </Descriptions.Item>
        <Descriptions.Item label="Number of Bedrooms">
          {request.beds}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
