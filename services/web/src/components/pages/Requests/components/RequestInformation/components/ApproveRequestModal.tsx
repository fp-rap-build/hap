import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { useSelector } from 'react-redux';

export default function ApproveRequestModal({
  isApprovedModalVisible,
  handleApprovalSubmit,
  loading,
  handleCancel,
  programs,
  setModalContent,
  modalContent,
  setRequest,
  setPrograms,
  request,
}) {
  const [selectedProgram, setSelectedProgram] = useState({
    id: null,
    budget: 0,
  });
  const [amountToSend, setAmountToSend] = useState(request.amountRequested);

  const currentUser = useSelector(state => state.user.currentUser);

  const handlePaymentSubmit = async () => {
    if (!amountToSend) return;

    const payment = {
      payerId: currentUser.id,
      requestId: request.id,
      programId: selectedProgram.id,
      amount: amountToSend,
    };

    try {
      await axiosWithAuth().post(`/requests/${request.id}/payments`, payment);

      const newBudget = selectedProgram.budget - amountToSend;

      setRequest(prevState => {
        return { ...prevState, requestStatus: 'approved' };
      });

      setPrograms(prevState =>
        prevState.map(program => {
          if (program.id === selectedProgram.id)
            return { ...program, budget: newBudget };

          return program;
        })
      );
    } catch (error) {
      message.error('Unable to submit payment');
    } finally {
      setAmountToSend(null);
      handleCancel();
    }
  };

  return (
    <Modal
      title={'Programs'}
      visible={isApprovedModalVisible}
      onOk={handlePaymentSubmit}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      {modalContent === 'programSelection' && (
        <ProgramsSelection
          programs={programs}
          setSelectedProgram={setSelectedProgram}
          setModalContent={setModalContent}
        />
      )}
      {modalContent === 'submitPayment' && (
        <SubmitPayment
          selectedProgram={selectedProgram}
          amountToSend={amountToSend}
          setAmountToSend={setAmountToSend}
        />
      )}
    </Modal>
  );
}

const ProgramsSelection = ({
  programs,
  setSelectedProgram,
  setModalContent,
}) => {
  const changeModalContent = () => {
    setModalContent('submitPayment');
  };

  const onProgramClick = program => {
    setModalContent('submitPayment');
    setSelectedProgram(program);
    console.log(program);
  };

  return (
    <div>
      <h1>Program selection</h1>
      {programs.map(program => (
        <div>
          <h2 onClick={() => onProgramClick(program)}>{program.name}</h2>
          <h3>Budget: ${program.budget}</h3>
        </div>
      ))}
    </div>
  );
};

const SubmitPayment = ({ selectedProgram, amountToSend, setAmountToSend }) => {
  const [budget, setBudget] = useState(selectedProgram.budget);

  const onChange = e => {
    const { value } = e.target;

    const newBudget = selectedProgram.budget - value;

    if (newBudget < 0) return;

    if (isNaN(value)) return;

    if (value.split('')[0] === '0') return; // Can't give a request 0 dollars

    setAmountToSend(value);
    setBudget(selectedProgram.budget - e.target.value);
  };

  return (
    <div>
      <h1>Submit payment</h1>
      <h2>Budget: ${budget}</h2>
      <Input
        onChange={onChange}
        name="payment"
        placeholder="Amount to pay"
        value={amountToSend}
      />
    </div>
  );
};
