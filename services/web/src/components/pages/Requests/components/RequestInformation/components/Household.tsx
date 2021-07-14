import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { updateRequest } from '../../../../../../redux/requests/requestActions';

import { Form, Input, Select, Checkbox } from 'antd';

import EditButton from './components/EditButton';

const { Option } = Select;

export default function Household({ request, setRequest, currentUser }) {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);

  const [form] = Form.useForm();

  const resetFields = () => {
    setDisabled(true);
    form.resetFields();

    setCheckboxValues({ unEmp90: request.unEmp90, foodWrkr: request.foodWrkr });
  };

  const [checkboxValues, setCheckboxValues] = useState({
    unEmp90: request.unEmp90,
    foodWrkr: request.foodWrkr,
  });

  const handleCheckboxChange = e => {
    const { name, checked } = e.target;

    setCheckboxValues({ ...checkboxValues, [name]: checked });
  };

  const handleHouseholdSubmit = values => {
    const updatedHousehold = {
      ...values,
      ...checkboxValues,
    };

    setRequest({ ...request, ...updatedHousehold });

    //add request id - needed for redux action updateRequest
    updatedHousehold['id'] = request.id;

    dispatch(updateRequest(updatedHousehold, currentUser));

    setDisabled(true);
  };

  return (
    <Form
      form={form}
      style={{
        marginBottom: '3rem',
      }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleHouseholdSubmit}
      layout="vertical"
    >
      <Form.Item
        name="tenantNumber"
        initialValue={request.tenantNumber}
        label="Phone Number"
        hasFeedback
      >
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item
        name="familySize"
        initialValue={request.familySize}
        label="Residents"
        hasFeedback
        rules={[
          {
            pattern: RegExp(/^([1-9][0-9]?)\s*$/),
            message: 'Invalid number of residents',
          },
        ]}
      >
        <Input
          disabled={disabled}
          style={{ width: '100%' }}
          name="familySize"
        />
      </Form.Item>

      <Form.Item
        name="beds"
        initialValue={request.beds}
        label="Total Bedrooms"
        hasFeedback
        rules={[
          {
            pattern: RegExp(/^([1-9][0-9]?)\s*$/),
            message: 'Invalid number of bedrooms',
          },
        ]}
      >
        <Input disabled={disabled} style={{ width: '100%' }} name="beds" />
      </Form.Item>

      <Form.Item
        name="totalChildren"
        initialValue={request.totalChildren}
        label="Number of Children in Household"
        hasFeedback
      >
        <Select disabled={disabled} style={{ width: '100%' }}>
          {numChildren.map(num => (
            <Option value={num}>{num}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="childrenAges"
        initialValue={request.childrenAges}
        label="Children ages"
        hasFeedback
      >
        <Input disabled={disabled} />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="monthlyIncome"
        initialValue={request.monthlyIncome}
        label={'Monthly Income'}
        rules={[
          {
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid income',
          },
        ]}
      >
        <Input
          disabled={disabled}
          name="monthlyIncome"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="monthlyRent"
        initialValue={request.monthlyRent}
        label={'Monthly Rent'}
        rules={[
          {
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid rent',
          },
        ]}
      >
        <Input
          disabled={disabled}
          name="monthlyRent"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="owed"
        initialValue={request.owed}
        label={'Total Amount Owed'}
        rules={[
          {
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid total',
          },
        ]}
      >
        <Input disabled={disabled} name="owed" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        hasFeedback
        name="amountRequested"
        initialValue={request.amountRequested}
        label={'Amount of Assistance Requested'}
        rules={[
          {
            pattern: RegExp(
              // forgive me
              /^(\b([0-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9]|[1-9][0-9][0-9][0-9][0-9][0-9][0-9])\b)\s*?$/
            ),
            message: 'Invalid total',
          },
        ]}
      >
        <Input
          disabled={disabled}
          name="amountRequested"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item>
        <Checkbox
          onChange={handleCheckboxChange}
          checked={checkboxValues.unEmp90}
          disabled={disabled}
          name="unEmp90"
        >
          Unemployed for 90+ days
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Checkbox
          onChange={handleCheckboxChange}
          checked={checkboxValues.foodWrkr}
          disabled={disabled}
          name="foodWrkr"
        >
          Food worker
        </Checkbox>
      </Form.Item>

      <EditButton
        disabled={disabled}
        setDisabled={setDisabled}
        onCancel={resetFields}
      />
    </Form>
  );
}

const numChildren = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
