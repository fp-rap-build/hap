import React, { useEffect, useState } from 'react';

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
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onOk = () => {
    let values = form.getFieldsValue();

    for (let field in values) {
      if (!values[field]) {
        let error = form.getFieldError(field);

        if (error.length !== 0) {
          form.scrollToField(field);

          return message.error('Please fill out all required fields');
        }
      }
    }

    form.submit();
  };

  const handleFinalReview = async values => {
    const requestValues = {
      budget: values.budget,
      landlordName: values.landlordName,
      landlordAddress: values.landlordAddress,
      landlordAddress2: values.landlordAddress2,
      landlordCity: values.landlordCity,
      landlordState: values.landlordState,
      landlordZip: values.landlordZip,
      landlordEmail: values.landlordEmail,
    };

    const userValues = {
      firstName: values.firstName,
      lastName: values.lastName,
    };

    const addressValues = {
      address: values.address,
      cityName: values.cityName,
      state: values.state,
      zipCode: values.zipCode,
    };

    setLoading(true);
    try {
      await axiosWithAuth().put(`/requests/${request.id}`, requestValues);
      await axiosWithAuth().put(
        `/requests/${request.id}/address`,
        addressValues
      );

      await axiosWithAuth().put(`/users/${request.userId}`, userValues);

      setRequest({ ...request, ...values });

      setVisible(false);
      showApprovedModal();
    } catch (error) {
      message.error('Unable to update request');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      form.validateFields();

      form.resetFields(); // Reset fields to get the latest state
    }
  }, [visible]);

  return (
    <Modal
      title={'Final Review'}
      visible={visible}
      onCancel={() => {
        form.resetFields();

        setVisible(false);
      }}
      onOk={onOk}
      confirmLoading={loading}
    >
      <Form onFinish={handleFinalReview} layout="vertical" form={form}>
        <Form.Item
          name="landlordName"
          label="Landlord Name"
          initialValue={request.landlordName}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            defaultValue={request.landlordName}
            value={request.landlordName}
            required={true}
          />
        </Form.Item>
        <Form.Item
          name="landlordAddress"
          initialValue={request.landlordAddress}
          label="Landlord Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.landlordAddress} />
        </Form.Item>
        <Form.Item
          name="landlordAddress2"
          initialValue={request.landlordAddress2}
          label="Landlord Address Line 2"
        >
          <Input defaultValue={request.landlordAddress2} />
        </Form.Item>
        <Form.Item
          name="landlordCity"
          initialValue={request.landlordCity}
          label="Landlord City"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.landlordCity} />
        </Form.Item>
        <Form.Item
          name="landlordState"
          initialValue={request.landlordState}
          label="Landlord state"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue={request.landlordState} showSearch>
            {states.map(state => (
              <Option value={state}>{state}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="landlordZip"
          initialValue={request.landlordZip}
          label="Landlord Zip"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.landlordZip} />
        </Form.Item>
        <Form.Item
          name="landlordEmail"
          initialValue={request.landlordEmail}
          label="Landlord Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.landlordEmail} />
        </Form.Item>

        <Form.Item
          name="firstName"
          initialValue={request.firstName}
          label="First Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.firstName} />
        </Form.Item>
        <Form.Item
          name="lastName"
          initialValue={request.lastName}
          label="Last Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.lastName} />
        </Form.Item>
        <Form.Item
          name="address"
          initialValue={request.address}
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.address} />
        </Form.Item>
        <Form.Item
          name="cityName"
          initialValue={request.cityName}
          label="City"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.cityName} />
        </Form.Item>
        <Form.Item
          name="state"
          initialValue={request.state}
          label="State"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue={request.state}>
            {states.map(state => (
              <Option value={state}>{state}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="zipCode"
          initialValue={request.zipCode}
          label="Zip"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input defaultValue={request.zipCode} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
