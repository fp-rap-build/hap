import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { updateAddress } from '../../../../../../../redux/requests/requestActions';

import EditableText from './components/EditableText';

import { Typography, Button } from 'antd';

const { Paragraph, Text } = Typography;

const AddressInfo = ({ request, addressDetails }) => {
  //Local state suite for antd editable text
  //UI works well but need to research better method of handling local state
  const { id } = addressDetails;

  const [displayInfo, setDisplayInfo] = useState(addressDetails);

  const dispatch = useDispatch();

  const handleUpdate = async () => {
    dispatch(updateAddress(displayInfo));
  };

  return (
    <div className="editableContent">
      <EditableText
        displayInfo={displayInfo}
        setDisplayInfo={setDisplayInfo}
        name="address"
        title="Address"
      />
      <EditableText
        displayInfo={displayInfo}
        setDisplayInfo={setDisplayInfo}
        name="cityName"
        title="City"
      />
      <Button onClick={handleUpdate}>Save Changes</Button>
    </div>
  );
};

export default AddressInfo;
