import { useState } from 'react';

import { useSelector } from 'react-redux';

import EditableText from './components/EditableText';

import { Typography, Button } from 'antd';

const { Paragraph, Text } = Typography;

const AddressInfo = ({ request }) => {
  const { address, cityName, state, zipCode, id } = request;

  //Local state suite for antd editable text
  //UI works well but need to research better method of handling local state
  const [addressText, setAddressText] = useState(address);
  const [cityNameText, setCityNameText] = useState(cityName);
  const [zipCodeInput, setZipCodeInput] = useState(zipCode);

  const handleUpdate = async () => {};

  return (
    <div className="editableContent">
      <EditableText
        state={addressText}
        setState={setAddressText}
        name="Address"
      />
      <EditableText
        state={cityNameText}
        setState={setCityNameText}
        name="City"
      />
      <EditableText
        state={zipCodeInput}
        setState={setZipCodeInput}
        name="Zip Code"
      />
      <Button onClick={handleUpdate}>Save Changes</Button>
    </div>
  );
};

export default AddressInfo;
