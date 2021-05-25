import { useState } from 'react';

import { updateAddress } from '../../../../../../../redux/requests/requestActions';

import EditableText from './components/EditableText';

import { Typography, Button, InputNumber, Checkbox, Divider } from 'antd';

const AddressInfo = ({
  requestData,
  addressData,
  handleAddressChange,
  handleZipChange,
  handleRequestChange,
}) => {
  return (
    <>
      <div className="addressInformation">
        <Typography.Title level={3}>Address Information:</Typography.Title>
        <EditableText
          name="address"
          title="Address"
          handleChange={handleAddressChange}
          data={addressData}
        />
        <EditableText
          name="addressLine2"
          title="Address Line Two"
          handleChange={handleAddressChange}
          data={addressData}
        />
        <EditableText
          name="cityName"
          title="City"
          handleChange={handleAddressChange}
          data={addressData}
        />
        <EditableText
          name="state"
          title="State"
          handleChange={handleAddressChange}
          data={addressData}
        />
        <InputNumber
          name="zipCode"
          size="large"
          onChange={handleZipChange}
          value={addressData.zipCode}
        />
      </div>
      <Divider />
      <div className="demographicInfo">
        <Typography.Title level={3}>Demographic Info:</Typography.Title>
        <Checkbox
          checked={requestData.hispanic}
          name="hispanic"
          onChange={handleRequestChange}
        >
          Hispanic/ Latino
        </Checkbox>
        <Checkbox
          checked={requestData.asian}
          name="asian"
          onChange={handleRequestChange}
        >
          Asian
        </Checkbox>
        <Checkbox
          checked={requestData.black}
          name="black"
          onChange={handleRequestChange}
        >
          Black or African American
        </Checkbox>
        <Checkbox
          checked={requestData.pacific}
          name="pacific"
          onChange={handleRequestChange}
        >
          Native Hawaiian or Other Pacific Islander
        </Checkbox>
        <Checkbox
          checked={requestData.white}
          name="white"
          onChange={handleRequestChange}
        >
          White
        </Checkbox>
        <Checkbox
          checked={requestData.native}
          name="native"
          onChange={handleRequestChange}
        >
          Native American or Alskan Native
        </Checkbox>
        <Checkbox
          checked={requestData.demoNotSay}
          name="demoNotSay"
          onChange={handleRequestChange}
        >
          Rather Not Say
        </Checkbox>
      </div>
    </>
  );
};

export default AddressInfo;
