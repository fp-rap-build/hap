import EditableText from '../../common/EditableText';

import { Typography } from 'antd';

const LandlordContact = ({ requestData, handleRequestChange }) => {
  return (
    <div className="Landlord Information:">
      <Typography.Title level={3}>Landlord Info:</Typography.Title>
      <EditableText
        name="landlordName"
        title="Landlord Name"
        handleChange={handleRequestChange}
        data={requestData}
      />
      <EditableText
        name="landlordEmail"
        title="Landlord Email"
        handleChange={handleRequestChange}
        data={requestData}
      />
      <EditableText
        name="landlordNumber"
        title="Landlord Phone Number"
        handleChange={handleRequestChange}
        data={requestData}
      />
    </div>
  );
};

export default LandlordContact;
