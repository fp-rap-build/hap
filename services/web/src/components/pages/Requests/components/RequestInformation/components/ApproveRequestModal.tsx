import React, { useState, useEffect } from 'react';
import { Modal, Input, message, Select, Form, Button } from 'antd';
import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

import { useSelector } from 'react-redux';

import socket from '../../../../../../config/socket';

const { Option } = Select;

export default function ApproveRequestModal({
  isApprovedModalVisible,
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

  const [paymentValues, setPaymentValues] = useState({
    amount: null,
    monthsBack: null,
    amountBack: null,
    monthsForward: null,
    amountForward: null,
    totalArrears: null,
    accountNumber: null,
    type: null,
    renterOrOwner: null,
    providerName: null,
    providerAddress: null,
  });

  const [amountToSend, setAmountToSend] = useState(null);

  const currentUser = useSelector(state => state.user.currentUser);

  const handlePaymentSubmit = async () => {
    const payment = {
      payerId: currentUser.id,
      requestId: request.id,
      programId: selectedProgram.id,
      amount: paymentValues.amount,
      monthsBack: paymentValues.monthsBack,
      amountBack: paymentValues.amountBack,
      monthsForward: paymentValues.monthsForward,
      amountForward: paymentValues.amountForward,
      totalArrears: paymentValues.totalArrears,
      accountNumber: paymentValues.accountNumber,
      type: paymentValues.type,
      renterOrOwner: paymentValues.renterOrOwner,
      providerName: paymentValues.providerName,
      providerAddress: paymentValues.providerAddress,
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
      footer={[]}
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
          handlePaymentSubmit={handlePaymentSubmit}
          paymentValues={paymentValues}
          setPaymentValues={setPaymentValues}
          selectedProgram={selectedProgram}
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
  const onProgramClick = program => {
    setModalContent('submitPayment');
    setSelectedProgram(program);
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
  paymentValues,
  setPaymentValues,

  handlePaymentSubmit,

  selectedProgram,
}) => {
  const [budget, setBudget] = useState(selectedProgram.budget);

  const onChange = e => {
    setPaymentValues({ ...paymentValues, [e.target.name]: e.target.value });
  };

  const onPaymentTypeChange = type => {
    setPaymentValues({ ...paymentValues, type });
  };

  const onRenterOrOwnerChange = renterOrOwner => {
    setPaymentValues({ ...paymentValues, renterOrOwner });
  };

  const onAmountChange = e => {
    const { value } = e.target;

    const newBudget = selectedProgram.budget - e.target.value;

    if (newBudget < 0) return;

    if (isNaN(value)) return;

    if (value.split('')[0] === '0') return; // Can't give a request 0 dollars

    setPaymentValues({ ...paymentValues, amount: value });
    setBudget(selectedProgram.budget - e.target.value);
  };

  return (
    <div>
      <h1>Submit payment</h1>
      <h2>Budget: ${budget}</h2>
      <Form
        layout="vertical"
        onFinish={handlePaymentSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Payment type"
          name="paymentType"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Payment type"
            style={{ width: '100%' }}
            onChange={onPaymentTypeChange}
          >
            <Option value="rental">Rental</Option>
            <Option value="utility">Utility</Option>
          </Select>
        </Form.Item>

        {paymentValues.type === 'utility' && (
          <>
            <Form.Item
              name="renterOrOwner"
              label="Renter or Owner"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Renter or Owner"
                style={{ width: '100%' }}
                onChange={onRenterOrOwnerChange}
              >
                <Option value="renter">Renter</Option>
                <Option value="owner">Owner</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={onChange}
                name="accountNumber"
                placeholder="Account number"
                value={paymentValues.accountNumber}
              />
            </Form.Item>

            <Form.Item
              name="providerName"
              label="Utility Provider Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={onChange}
                name="providerName"
                placeholder="Provider Name"
                value={paymentValues.providerName}
              />
            </Form.Item>

            <Form.Item
              name="providerAddress"
              label="Utility Provider Address"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={onChange}
                name="providerAddress"
                placeholder="Provider Address"
                value={paymentValues.providerAddress}
              />
            </Form.Item>
          </>
        )}

        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={onAmountChange}
            name="amount"
            placeholder="Amount approved"
            value={paymentValues.amount}
          />
        </Form.Item>

        <Form.Item
          name="monthsBack"
          label="Months Back"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={onChange}
            name="monthsBack"
            placeholder="Months Back"
            value={paymentValues.monthsBack}
          />
        </Form.Item>

        <Form.Item
          name="totalArrears"
          label="Total Arrears"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={onChange}
            name="totalArrears"
            placeholder="Total Arrears"
            value={paymentValues.totalArrears}
          />
        </Form.Item>

        <Form.Item
          name="monthsForward"
          label="Months Forward"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={onChange}
            name="monthsForward"
            placeholder="Months Forward"
            value={paymentValues.monthsForward}
          />
        </Form.Item>

        <Form.Item
          name="amountForward"
          label="Amount Forward"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={onChange}
            name="amountForward"
            placeholder="Amount Forward"
            value={paymentValues.amountForward}
          />
        </Form.Item>

        <Form.Item
          name="amountBack"
          label="Amount Back"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            onChange={onChange}
            name="amountBack"
            placeholder="Amount Back"
            value={paymentValues.amountBack}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
