import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { Form } from 'antd';

import BasicInformation from './forms/Eligibility/BasicInformation';

import HouseholdInformation from './forms/Eligibility/HouseholdInformation';

import Demographics from './forms/Eligibility/Demographics';

import AdditionalInformation from './forms/Eligibility/AdditionalInformation';

import SecondaryContact from './forms/LandLordContact';

import Review from './forms/Eligibility/Review';

import CreateAccount from './forms/CreateAccount';

import ProgramSelection from './forms/ProgramSelection';

import Button from 'antd/lib/button';

import '../../../styles/pages/apply.less';

import { registerAndApply } from '../../../redux/users/userActions';

import { clearErrorMessage } from '../../../redux/users/userActions';

import { setErrorMessage } from '../../../redux/global/globalActions';

const faker = require('faker');

// create a fake date to use for date of birth on application

const dob = new Date('2015-03-25');

const INITIAL_VALUES_DEV = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.phoneNumber(),
  password: 'testpassword',
  confirmPassword: 'testpassword',
  address: '1211 test St',
  addressLine2: 'Unit 100',
  cityName: 'Spokane',
  zipCode: 99205,
  state: 'Washington',
  role: 'tenant',
  familySize: 4,
  beds: 4,
  monthlyIncome: 1000,
  monthlyRent: 500,
  tenantName: 'tenant',
  tenantEmail: 'tenant@gmail.com',
  tenantNumber: '111-222-3333',
  landlordName: 'landlord',
  landlordAddress: '123 Landlord St',
  landlordAddress2: 'Unit 2',
  landlordCity: 'Landlord City',
  landlordState: 'Washington',
  landlordZip: 99205,
  landlordEmail: 'landlord@gmail.com',
  landlordNumber: '111-222-3333',
  childrenAges: '4, 2',
  owed: 600,
  amountRequested: 450,
  budget: 'Treasury ERA',
  rent: 500.45,
  advocate: false,
  totalChildren: 2,
  unEmp90: true,
  foodWrkr: false,
  minorGuest: true,
  covidFH: true,
  hispanicHOH: true,
  asianHOH: false,
  blackHOH: false,
  pacificHOH: false,
  whiteHOH: true,
  nativeHOH: false,
  demoNotSayHOH: false,
  gender: 'Male',
  dob: dob,
  hispanic: true,
  asian: false,
  black: false,
  pacific: false,
  white: true,
  native: false,
  demoNotSay: false,
  incomplete: true,
};

const INITIAL_VALUES_PROD = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  address: '',
  addressLine2: '',
  cityName: '',
  zipCode: '',
  state: '',
  role: 'tenant',
  familySize: '',
  beds: null,
  dob: '',
  monthlyIncome: '',
  tenantName: '',
  tenantEmail: '',
  tenantPhoneNumber: '',
  landlordName: '',
  landlordAddress: '',
  landlordAddress2: '',
  landlordCity: '',
  landlordState: '',
  landlordZip: null,
  landlordEmail: '',
  landlordNumber: '',
  childrenAges: '',
  owed: null,
  amountRequested: null,
  amountApproved: null,
  budget: '',
  rent: null,
  monthlyRent: null,
  advocate: false,
  totalChildren: null,
  unEmp90: false,
  foodWrkr: false,
  minorGuest: false,
  covidFH: false,
  hispanic: false,
  asian: false,
  black: false,
  pacific: false,
  white: false,
  native: false,
  demoNotSay: false,
  hispanicHOH: false,
  asianHOH: false,
  blackHOH: false,
  pacificHOH: false,
  whiteHOH: false,
  nativeHOH: false,
  demoNotSayHOH: false,
  gender: '',
  incomplete: true,
};

const finalStep = 7;

export default function Index() {
  const loading = useSelector(state => state.global.isLoading);

  const errorMessage = useSelector(state => state.user.errorMessage);

  const dispatch = useDispatch();

  const history = useHistory();

  const [step, setStep] = useState(0);

  const goForward = () => {
    setStep(step + 1);
  };

  const goBackwards = () => setStep(step - 1);

  const [formValues, setFormValues] = useState(
    process.env.NODE_ENV === 'development'
      ? INITIAL_VALUES_DEV
      : INITIAL_VALUES_PROD
  );

  const [formConsent, setFormConsent] = useState(false);

  const handleChange = e => {
    // Clean up any error message after the user types
    if (errorMessage) {
      dispatch(clearErrorMessage());
    }

    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  function onStateChange(value) {
    setFormValues({ ...formValues, state: value });
  }

  const handleDateChange = (value, dateString) => {
    setFormValues({
      ...formValues,
      dob: dateString,
    });
  };

  function onDateChange(value) {
    setFormValues({ ...formValues, dob: value });
  }

  function onGenderChange(value) {
    setFormValues({ ...formValues, gender: value });
  }

  const onRoleChange = value => {
    setFormValues({ ...formValues, role: value });
  };

  const handleCheckBoxChange = e => {
    e.stopPropagation();

    const { name, checked } = e.target;

    setFormValues({ ...formValues, [name]: checked });
  };

  const handleSubmit = () => {
    // Break out of the submit if there are errors
    if (errorMessage) return;

    // Check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      return dispatch(setErrorMessage('Passwords must match'));
    }

    if (formValues.password.length < 10) {
      return dispatch(
        setErrorMessage('Password must be at least 10 characters')
      );
    }

    dispatch(registerAndApply(formValues, history));
  };

  let props = {
    formValues,
    step,
    setStep,
    setFormValues,
    goBackwards,
    goForward,
    loading,
    onStateChange,
    onGenderChange,
    onRoleChange,
    onDateChange,
    handleCheckBoxChange,
    handleDateChange,
    formConsent,
    setFormConsent,
  };

  return (
    <div className="container">
      <Form
        layout="vertical"
        onChange={handleChange}
        onFinish={step === finalStep ? handleSubmit : () => goForward()}
        className="form"
      >
        <RenderForm {...props} />
        <FormNavigation {...props} />
      </Form>
    </div>
  );
}

const manageFormButton = (step, formConsent) => {
  if (step === 3 && formConsent === false) {
    return true;
  } else {
    return false;
  }
};

const FormNavigation = ({ step, goBackwards, loading, formConsent }) => {
  return (
    <div className="formNavigation">
      {step > 0 && <Button onClick={() => goBackwards()}>Previous</Button>}
      {step === finalStep ? (
        <Button
          htmlType="submit"
          style={{ backgroundColor: '#198754', borderColor: '#198754' }}
          type="primary"
        >
          {loading ? 'Loading. . .' : 'Submit'}
        </Button>
      ) : (
        <Button
          style={step === 4 ? { display: 'none' } : {}}
          type="primary"
          htmlType="submit"
          disabled={manageFormButton(step, formConsent)}
        >
          Next
        </Button>
      )}
    </div>
  );
};

const RenderForm = props => {
  switch (props.step) {
    case 0:
      return <BasicInformation {...props} />;
    case 1:
      return <HouseholdInformation {...props} />;
    case 2:
      return <Demographics {...props} />;
    case 3:
      return <AdditionalInformation {...props} />;
    case 4:
      return <ProgramSelection {...props} />;
    case 5:
      return <SecondaryContact {...props} />;
    case 6:
      return <Review {...props} />;
    case 7:
      return <CreateAccount {...props} />;
  }
};
