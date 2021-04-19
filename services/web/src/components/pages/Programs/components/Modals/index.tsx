import React, { useState } from 'react';

import AddNewProgramModal from './AddNewProgramModal';
import EditProgramModal from './EditProgramModal';

export default function Index({ props }) {
  return (
    <>
      <AddNewProgramModal
        setPrograms={props.setPrograms}
        isProgramModalVisible={props.isProgramModalVisible}
        setIsProgramModalVisible={props.setIsProgramModalVisible}
      />

      <EditProgramModal
        programs={props.programs}
        setPrograms={props.setPrograms}
        currentProgram={props.currentProgram}
        isEditProgramModalVisible={props.isEditProgramModalVisible}
        setIsEditProgramModalVisible={props.setIsEditProgramModalVisible}
      />
    </>
  );
}
