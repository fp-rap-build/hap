import { useDispatch } from 'react-redux';

import {
  updateAddress,
  updateRequest,
} from '../../../../../../redux/requests/requestActions';

import EditableText from '../../common/EditableText';

import EditableNum from '../../common/EditableNum';

import { Typography, Divider, Button } from 'antd';

const AddressInfo = ({
  requestData,
  addressData,
  handleAddressChange,
  handleNumChange,
  handleRequestChange,
  setAddressData,
}) => {
  const dispatch = useDispatch();

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
      <Button
        onClick={() => {
          dispatch(updateRequest(requestData));
        }}
      >
        Redux Test
      </Button>
    </>
  );
};

export default AddressInfo;
