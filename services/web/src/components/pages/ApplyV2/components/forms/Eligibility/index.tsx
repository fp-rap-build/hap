import { useState } from 'react';

import EligibilityForm from './components/EligibilityForm';

import IncomeEarners from './components/IncomeEarners';

import ProgramSelection from './components/ProgramSelection';

import { VerifyAddress } from '..';

const Index = ({
  formValues,
  setFormValues,
  handleChange,
  setCurrentContent,
  onStateChange,
  handleCheckBoxChange,
}) => {
  const [eligibilityContent, setEligibilityContent] = useState('verifyAddress');

  let props = {
    formValues,
    handleChange,
    setFormValues,
    onStateChange,
    handleCheckBoxChange,
    setCurrentContent,
    setEligibilityContent,
  };

  return <RenderContent content={eligibilityContent} props={{ ...props }} />;
};

const RenderContent = ({ content, props }) => {
  switch (content) {
    case 'verifyAddress':
      return <VerifyAddress {...props} />;
    case 'income':
      return <IncomeEarners {...props} />;
    case 'eligibility':
      return <EligibilityForm {...props} />;
    case 'programs':
      return <ProgramSelection {...props} />;
    default:
      return <h1>Hello</h1>;
  }
};

export default Index;
