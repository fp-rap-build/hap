import { useState } from 'react';

import EligibilityForm from './components/EligibilityForm';

import ProgramSelection from './components/ProgramSelection';

const Index = ({
  formValues,
  handleChange,
  setCurrentContent,
  onStateChange,
  handleCheckBoxChange,
}) => {
  const [isProgramsPageVisibile, setIsProgramsPageVisible] = useState(false);

  const showPrograms = () => setIsProgramsPageVisible(true);

  let props = {
    formValues,
    handleChange,
    onStateChange,
    handleCheckBoxChange,
    showPrograms,
    setCurrentContent,
  };

  if (isProgramsPageVisibile)
    return (
      <ProgramSelection
        formValues={formValues}
        setCurrentContent={setCurrentContent}
      />
    );

  return (
    <EligibilityForm
      formValues={formValues}
      handleChange={handleChange}
      onStateChange={onStateChange}
      handleCheckBoxChange={handleCheckBoxChange}
      showPrograms={showPrograms}
    />
  );
};

export default Index;
