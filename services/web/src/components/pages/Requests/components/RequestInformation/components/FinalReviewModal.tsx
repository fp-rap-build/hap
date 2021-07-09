import React from 'react';

import { Modal, Input, message, Form, Select } from 'antd';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';
import { states } from '../../../../../../utils/data/states';

const { Option } = Select;

export default function FinalReviewModal({
  visible,
  setVisible,
  showApprovedModal,
  request,
  setRequest,
  programs,
}) {
  const [form] = Form.useForm();

  const onOk = () => {
    form.submit();
  };

  const handleFinalReview = values => {
    console.log(values);
  };

  return (
    <Modal
      title={'Final Review'}
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={onOk}
    >
      <Form onFinish={handleFinalReview} layout="vertical" form={form}>
        <Form.Item name="budget" label="Budget">
          <Select defaultValue={request.budget}>
            {programs.map(program => (
              <Option value={program.name}>{program.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="landlordName"
          label="Landlord Name"
          initialValue={request.landlordName}
        >
          <Input
            defaultValue={request.landlordName}
            value={request.landlordName}
          />
        </Form.Item>
        <Form.Item label="Landlord Address">
          <Input defaultValue={request.landlordAddress} />
        </Form.Item>
        <Form.Item label="Landlord Address Line 2 (optional)">
          <Input defaultValue={request.landlordAddress2} />
        </Form.Item>
        <Form.Item label="Landlord City">
          <Input defaultValue={request.landlordCity} />
        </Form.Item>
        <Form.Item label="Landlord state">
          <Select defaultValue={request.landlordState}>
            {states.map(state => (
              <Option value={state}>{state}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Landlord Zip">
          <Input defaultValue={request.landlordZip} />
        </Form.Item>
        <Form.Item label="Landlord Email">
          <Input defaultValue={request.landlordEmail} />
        </Form.Item>
        <Form.Item label="Amount Approved">
          <Input defaultValue={request.amountApproved} />
        </Form.Item>
        <Form.Item label="First Name">
          <Input defaultValue={request.firstName} />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input defaultValue={request.lastName} />
        </Form.Item>
        <Form.Item label="Address">
          <Input defaultValue={request.address} />
        </Form.Item>
        <Form.Item label="City">
          <Input defaultValue={request.cityName} />
        </Form.Item>
        <Form.Item label="State">
          <Select defaultValue={request.landlordState}>
            {states.map(state => (
              <Option value={state}>{state}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Zip">
          <Input defaultValue={request.zipCode} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
