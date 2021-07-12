import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import handleRequestActivity from '../../../../../../utils/handleRequestActivity';

import { updateUserNameInfo } from '../../../../../../redux/users/userActions';

import {
  fetchIncomes,
  updateAddress,
  updateRequest,
} from '../../../../../../redux/requests/requestActions';

import ApplicantProfileInfo from './ApplicantProfileInfo';
import AddressInfo from './AddressInfo';
import LandlordContact from './LandlordContact';
import DemoInfo from './DemoInfo';
import Household from './Household';
import Income from './Income.js';
import Footer from './Footer';

import RenderMenu from './RenderMenu';

import { Layout } from 'antd';

const { Content } = Layout;

const buildApplicantData = currentUser => {
  return {
    id: currentUser.id,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    role: currentUser.role,
    dob: currentUser.dob,
  };
};

const UserInfo = () => {
  const dispatch = useDispatch();

  const request = useSelector(state => state.requests);
  const currentUser = useSelector(state => state.user.currentUser);

  const [requestData, setRequestData] = useState(request.request);
  const [addressData, setAddressData] = useState(request.addressDetails);
  const [applicantData, setApplicantData] = useState(
    buildApplicantData(currentUser)
  );
  //currentContent toggles with menu - set initial display here
  const [currentContent, setCurrentContent] = useState('applicant');
  const [disabled, setDisabled] = useState(true);

  //Refactor - create userdash middleware to pull all necessary info in one place
  useEffect(() => {
    dispatch(fetchIncomes(requestData.id));
    //eslint-disable-next-line
  }, []);

  const onContentChange = ({ key }) => {
    setCurrentContent(key);
  };

  const handleApplicantChange = e => {
    const { name, value } = e.target;
    setApplicantData({ ...applicantData, [name]: value });
  };

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddressData({ ...addressData, [name]: value });
  };

  const handleStateChange = value => {
    setAddressData({ ...addressData, state: value });
  };

  const handleGenderChange = value => {
    setRequestData({ ...requestData, gender: value });
  };

  const handleNumOfChildrenChange = value => {
    setRequestData({ ...requestData, totalChildren: value });
  };

  const handleRequestChange = e => {
    e.stopPropagation();

    const { name, checked, type, value } = e.target;

    if (type === 'checkbox') {
      setRequestData({ ...requestData, [name]: checked });
    } else {
      setRequestData({ ...requestData, [name]: value });
    }
  };

  const postAddress = () => {
    dispatch(updateAddress(addressData));
  };

  const postRequest = () => {
    dispatch(updateRequest(requestData, currentUser));
  };

  const postApplicant = async () => {
    dispatch(updateUserNameInfo(applicantData));
  };

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  const props = {
    currentContent,
    requestData,
    addressData,
    applicantData,
    handleAddressChange,
    handleRequestChange,
    handleStateChange,
    handleGenderChange,
    disabled,
    toggleDisabled,
    handleNumOfChildrenChange,
    handleApplicantChange,
    postAddress,
    postRequest,
    postApplicant,
  };

  return (
    <div>
      <Layout>
        <RenderMenu onContentChange={onContentChange} />
        <Content>
          {renderContent(props)}
          <Footer {...props} />
        </Content>
      </Layout>
    </div>
  );
};

const renderContent = props => {
  switch (props.currentContent) {
    case 'applicant':
      return <ApplicantProfileInfo {...props} />;
    case 'address':
      return <AddressInfo {...props} />;
    case 'household':
      return <Household {...props} />;
    case 'landlordContact':
      return <LandlordContact {...props} />;
    case 'demographic':
      return <DemoInfo {...props} />;
    case 'income':
      return <Income {...props} />;
    default:
      return <h3>Not Built Yet :/</h3>;
  }
};

export default UserInfo;
