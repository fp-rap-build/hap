import { useState } from 'react';

import EditableText from '../../common/EditableText';

import { Typography, Divider } from 'antd';

const LandlordContact = ({ requestData, handleRequestChange }) => {
  const [editable, setEditable] = useState(true);

  return (
    <div className="landlordInformation userInfoContent">
      <Typography.Title level={3}>Landlord Info:</Typography.Title>
      <Divider />
      <EditableText
        name="landlordName"
        title="Landlord Name"
        handleChange={handleRequestChange}
        data={requestData}
        editable={editable}
      />
      <EditableText
        name="landlordEmail"
        title="Landlord Email"
        handleChange={handleRequestChange}
        data={requestData}
        editable={editable}
      />
      <EditableText
        name="landlordNumber"
        title="Landlord Phone Number"
        handleChange={handleRequestChange}
        data={requestData}
        editable={editable}
      />
    </div>
  );
};

export default LandlordContact;
