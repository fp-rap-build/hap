import { useState } from 'react';

import EditableText from './components/EditableText';

import { Typography } from 'antd';

const { Paragraph, Text } = Typography;

const AddressInfo = ({ request }) => {
  const { address, cityName, state, zipCode } = request;

  //Local state suite for antd editable text
  //UI works well but need to research better method of handling local state
  const [addressText, setAddressText] = useState(address);
  const [cityNameText, setCityNameText] = useState(cityName);
  const [zipCodeInput, setZipcodeInput] = useState(zipCode);

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
        setState={setZipcodeInput}
        name="Zip Code"
      />
    </div>
  );
};

export default AddressInfo;
