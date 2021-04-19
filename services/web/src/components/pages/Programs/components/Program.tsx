import React from 'react';

import { Card } from 'antd';

export default function Program({
  program,
  setCurrentProgram,
  openEditProgramModal,
}) {
  const handleEditClick = () => {
    console.log(program);
    setCurrentProgram(program);
    openEditProgramModal();
  };

  return (
    <Card
      title={program.name}
      extra={<a onClick={handleEditClick}>Edit</a>}
      style={{ width: 300 }}
    >
      <h3>Budget {program.budget}</h3>
    </Card>
  );
}
