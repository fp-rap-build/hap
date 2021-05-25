import { useState } from 'react';

import { updateAddress } from '../../../../../../../redux/requests/requestActions';

import EditableText from './components/EditableText';

import EditableNum from './components/EditableNum';

import { Typography, Button, InputNumber, Checkbox, Divider } from 'antd';

const AddressInfo = ({
  requestData,
  addressData,
  handleAddressChange,
  handleNumChange,
  handleRequestChange,
  setRequestData,
  setAddressData,
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
        <EditableNum
          title="Zip Code"
          name="zipCode"
          handleNumChange={handleNumChange}
          state={addressData}
          setState={setAddressData}
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
      <Divider />
      <div className="householdInfo">
        <Typography.Title level={3}>Household Info:</Typography.Title>
        <Checkbox
          checked={requestData.foodWrkr}
          name="foodWrkr"
          onChange={handleRequestChange}
        >
          Worked in Food Service
        </Checkbox>
        <Checkbox
          checked={requestData.unEmp90}
          name="unEmp90"
          onChange={handleRequestChange}
        >
          Unemployed in the past 90 days
        </Checkbox>
        <EditableNum
          title="Family Size"
          name="familySize"
          handleNumChange={handleNumChange}
          state={requestData}
          setState={setRequestData}
        />
        <EditableNum
          title="Numbe of Children"
          name="numChildren"
          handleNumChange={handleNumChange}
          state={requestData}
          setState={setRequestData}
        />
        <EditableNum
          title="Monthly Income"
          name="monthlyIncome"
          handleNumChange={handleNumChange}
          state={requestData}
          setState={setRequestData}
        />
        <EditableNum
          title="Monthly Rent"
          name="monthlyRent"
          handleNumChange={handleNumChange}
          state={requestData}
          setState={setRequestData}
        />
      </div>
      <Divider />
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
    </>
  );
};

export default AddressInfo;
