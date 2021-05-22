import { useState, useEffect } from 'react';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import EditableText from './components/EditableText';

import { Typography, Button } from 'antd';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

const AddressInfo = ({ request }) => {
  const { address, cityName, state, zipCode, id } = request;

  //Local state suite for antd editable text
  //UI works well but need to research better method of handling local state
  const [addressText, setAddressText] = useState(address);
  const [cityNameText, setCityNameText] = useState(cityName);
  const [zipCodeInput, setZipCodeInput] = useState(zipCode);

  const handleUpdate = async () => {
    try {
      await axiosWithAuth().put(`/requests/${id}`, {
        address: addressText,
      });
    } catch (error) {
      alert('error updating request');
      console.log(error);
    }
  };

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
