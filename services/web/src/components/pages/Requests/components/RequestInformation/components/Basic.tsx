import { Descriptions } from 'antd';

export default function Basic({ ages, request }) {
  const childrensAges = ages
    .filter(age => age.role === 'child')
    .map(age => age.age)
    .join(', ');

  return (
    <Descriptions column={2}>
      <Descriptions.Item label="Name">{`${request.firstName} ${request.lastName}`}</Descriptions.Item>
      <Descriptions.Item label="State">{request.state}</Descriptions.Item>
      <Descriptions.Item label="Email">
        <a href={`mailto:${request.email}`}>{request.email}</a>
      </Descriptions.Item>
      <Descriptions.Item label="City">{request.cityName}</Descriptions.Item>
      <Descriptions.Item label="Role">{request.role}</Descriptions.Item>
      <Descriptions.Item label="Zip">{request.zipCode}</Descriptions.Item>
      <Descriptions.Item label="Organization">none</Descriptions.Item>
      <Descriptions.Item label="Address">{request.address}</Descriptions.Item>
      <Descriptions.Item label="Food Worker">
        {request.foodWrkr ? 'Yes' : 'No'}
      </Descriptions.Item>
      <Descriptions.Item label="Unemployed for 90 days">
        {request.unEmp90 ? 'Yes' : 'No'}
      </Descriptions.Item>
      <Descriptions.Item label="Number of Children">
        {ages.filter(age => age.role === 'child').length}
      </Descriptions.Item>
      <Descriptions.Item label="Childrens Ages">
        {childrensAges}
      </Descriptions.Item>
    </Descriptions>
  );
}
