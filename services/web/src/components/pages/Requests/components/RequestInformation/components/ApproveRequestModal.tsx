import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { useSelector } from 'react-redux';

import socket from '../../../../../../config/socket';
import { Payment } from '@material-ui/icons';

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

  const [amountToSend, setAmountToSend] = useState(null);

  const [numofMonthsBack, setNumofMonthsBack] = useState(null);

  const [numofMonthsForward, setNumofMonthsForward] = useState(null);

  const [amountForward, setAmountForward] = useState(null);

  const [amountBack, setAmountBack] = useState(null);

  const [totalArrears, setTotalArrears] = useState(null);

  const currentUser = useSelector(state => state.user.currentUser);

  const handlePaymentSubmit = async () => {
    if (!amountToSend) return message.error('Please enter a valid amount');
    if (!numofMonthsBack)
      return message.error('Please enter a valid number of months');
    if (!numofMonthsForward)
      return message.error('Please enter a valid number of months');
    if (!amountBack) return message.error('Please enter a valid amount');
    if (!amountForward) return message.error('Please enter a valid amount');
    if (!totalArrears) return message.error('Please enter a valid amount');

    const payment = {
      payerId: currentUser.id,
      requestId: request.id,
      programId: selectedProgram.id,
      amount: amountToSend,
      monthsBack: numofMonthsBack,
      amountBack: amountBack,
      monthsForward: numofMonthsForward,
      amountForward: amountForward,
      totalArrears: totalArrears,
    };

    try {
      await axiosWithAuth().post(`/requests/${request.id}/payments`, payment);

      await axiosWithAuth().put(`/requests/${request.id}`, {
        requestStatus: 'approved',
        pmApproval: false,
      });

      const newBudget = selectedProgram.budget - amountToSend;

      socket.emit('requestChange', {
        requestId: request.id,
        senderId: currentUser.id,
        message: `${request.firstName}'s request has been approved!`,
      });

      setRequest(prevState => {
        return {
          ...prevState,
          requestStatus: 'approved',
        };
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
          numofMonthsBack={numofMonthsBack}
          numofMonthsForward={numofMonthsForward}
          setNumofMonthsBack={setNumofMonthsBack}
          setNumofMonthsForward={setNumofMonthsForward}
          setAmountForward={setAmountForward}
          setAmountBack={setAmountBack}
          amountForward={amountForward}
          amountBack={amountBack}
          setTotalArrears={setTotalArrears}
          totalArrears={totalArrears}
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

const SubmitPayment = ({
  selectedProgram,
  amountToSend,
  setAmountToSend,
  numofMonthsBack,
  setNumofMonthsBack,
  setNumofMonthsForward,
  numofMonthsForward,
  amountForward,
  amountBack,
  setAmountForward,
  setAmountBack,
  setTotalArrears,
  totalArrears,
}) => {
  const [budget, setBudget] = useState(selectedProgram.budget);

  const onChange = e => {
    const { value } = e.target;

    const newBudget = selectedProgram.budget - e.target.value;

    if (newBudget < 0) return;

    if (isNaN(value)) return;

    if (value.split('')[0] === '0') return; // Can't give a request 0 dollars

    setAmountToSend(value);
    setBudget(selectedProgram.budget - e.target.value);
  };

  const onTotalArrearsChange = e => {
    const { value } = e.target;
    setTotalArrears(value);
  };

  const onMonthBackChange = e => {
    const { value } = e.target;
    setNumofMonthsBack(value);
  };

  const onMonthForwardChange = e => {
    const { value } = e.target;
    setNumofMonthsForward(value);
  };

  const onAmountForwardChange = e => {
    const { value } = e.target;
    setAmountForward(value);
  };

  const onAmountBackChange = e => {
    const { value } = e.target;
    setAmountBack(value);
  };

  return (
    <div>
      <h1>Submit payment</h1>
      <h2>Budget: ${budget}</h2>
      <Input
        onChange={onChange}
        name="payment"
        placeholder="Amount approved"
        value={amountToSend}
      />
      <Input
        onChange={onMonthBackChange}
        name="monthsBack"
        placeholder="Months Back"
        value={numofMonthsBack}
      />
      <Input
        onChange={onTotalArrearsChange}
        name="totalArrears"
        placeholder="Total Arrears"
        value={totalArrears}
      />
      <Input
        onChange={onMonthForwardChange}
        name="monthsForward"
        placeholder="Months Forward"
        value={numofMonthsForward}
      />
      <Input
        onChange={onAmountForwardChange}
        name="amountForward"
        placeholder="Amount Forward"
        value={amountForward}
      />
      <Input
        onChange={onAmountBackChange}
        name="amountBack"
        placeholder="Amount Back"
        value={amountBack}
      />
    </div>
  );
};
