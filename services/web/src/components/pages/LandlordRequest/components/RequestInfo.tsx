import { Card, Descriptions, Typography } from 'antd';

const { Title } = Typography;

export default function RequestInfo({ request }) {
  const addressCardData = {
    title: 'Address',
    descriptions: [
      { label: 'Street', data: request.address },
      { label: 'City & State', data: request.cityName + ', ' + request.state },
      { label: 'Zip Code', data: request.zipCode },
    ],
  };

  const applicantCardData = {
    title: 'Tenant Information',
    descriptions: [
      { label: 'Name', data: request.firstName + ' ' + request.lastName },
      { label: 'Email', data: request.email },
      { label: 'Amount Owed', data: request.owed },
      { label: 'Amount Requested', data: request.amountRequested },
    ],
  };

  return (
    <div>
      <Title level={3} underline>
        Request Information
      </Title>
      <Descriptions title="User Info">
        <Descriptions.Item label="Tenant Name">
          {request.firstName} {request.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{request.email}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {request.email}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Address Info">
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
      </Descriptions>
    </div>
  );
}

const ContentCard = ({ cardData }) => {
  const { title, descriptions } = cardData;

  return (
    <Card title={title} style={{ width: '18rem' }}>
      <Descriptions column={1}>
        {descriptions.map(description => (
          <Descriptions.Item label={description.label}>
            {description.data}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Card>
  );
};
