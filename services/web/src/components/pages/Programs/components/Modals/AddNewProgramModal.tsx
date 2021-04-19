import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Form, Input, Button, Checkbox, Modal, message } from 'antd';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

export default function AddNewProgramModal({
  setPrograms,
  isProgramModalVisible,
  setIsProgramModalVisible,
}) {
  const [formValues, setFormValues] = useState({
    name: '',
    budget: null,
  });

  const { id } = useParams();

  const updateFormValues = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsProgramModalVisible(false);
  };

  const createProgram = async () => {
    const program = {
      name: formValues.name,
      budget: formValues.budget,
    };

    try {
      let res = await axiosWithAuth().post(`/orgs/${id}/programs`, program);

      setPrograms(prevState => [...prevState, res.data.program]);

      closeModal();
    } catch (error) {
      message.error('Unable to create program');
    }
  };

  return (
    <Modal
      title="Add New Program"
      visible={isProgramModalVisible}
      onOk={createProgram}
      onCancel={closeModal}
    >
      <AddProgramForm updateFormValues={updateFormValues} />
    </Modal>
  );
}

const AddProgramForm = ({ updateFormValues }) => {
  return (
    <Form layout="vertical" onChange={updateFormValues}>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the programs name!',
          },
        ]}
      >
        <Input name="name" />
      </Form.Item>

      <Form.Item
        label="Budget"
        rules={[
          {
            required: true,
            message: 'Please input the budget for this program!',
          },
        ]}
      >
        <Input name="budget" />
      </Form.Item>
    </Form>
  );
};
