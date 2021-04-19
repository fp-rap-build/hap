import React, { useState, useEffect } from 'react';

import { Form, Input, Button, Checkbox, Modal, message } from 'antd';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

export default function EditProgramModal({
  programs,
  setPrograms,
  currentProgram,
  isEditProgramModalVisible,
  setIsEditProgramModalVisible,
}) {
  const [formValues, setFormValues] = useState({
    name: '',
    budget: null,
    id: null,
  });

  const updateFormValues = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsEditProgramModalVisible(false);
  };

  const handleSubmit = async () => {
    const updatedProgram = {
      id: formValues.id,
      name: formValues.name,
      budget: formValues.budget,
    };

    try {
      await axiosWithAuth().put(
        `/programs/${currentProgram.id}`,
        updatedProgram
      );

      setPrograms(prevState =>
        prevState.map(program => {
          if (program.id === currentProgram.id) {
            return updatedProgram;
          }
          return program;
        })
      );
    } catch (error) {
      console.log(error);
      message.error('unable to edit program');
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    setFormValues(currentProgram);
  }, [currentProgram]);

  return (
    <Modal
      title={currentProgram.name}
      visible={isEditProgramModalVisible}
      onOk={handleSubmit}
      onCancel={closeModal}
    >
      <EditProgramForm
        updateFormValues={updateFormValues}
        formValues={formValues}
      />
    </Modal>
  );
}

const EditProgramForm = ({ updateFormValues, formValues }) => {
  return (
    <Form layout="vertical" onChange={updateFormValues}>
      <Form.Item
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input the programs name!',
          },
        ]}
      >
        <Input name="name" value={formValues.name} />
      </Form.Item>

      <Form.Item
        label="Budget"
        initialValue={formValues.budget}
        rules={[
          {
            required: true,
            message: 'Please input the budget for this program!',
          },
        ]}
      >
        <Input name="budget" value={formValues.budget} />
      </Form.Item>
    </Form>
  );
};
