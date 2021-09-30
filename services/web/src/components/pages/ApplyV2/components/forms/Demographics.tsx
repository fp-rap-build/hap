import React from 'react';

import {
  Card,
  Checkbox,
  Button,
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  Typography,
  Divider,
} from 'antd';

import { states } from '../../../../../utils/data/states';

import { genders } from '../../../../../utils/data/genders';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';
import { setCurrentUser } from '../../../../../redux/users/userActions';

const { Option } = Select;

const { Title } = Typography;

export default function Address({
  formValues,
  handleChange,
  onStateChange,
  handleCheckBoxChange,
  handleDateChange,
  onGenderChange,
  setCurrentContent,
  request,
  currentUser,
  dispatch,
}) {
  return (
    <Form
      layout="vertical"
      onChange={handleChange}
      onFinish={() =>
        updateDemographics(
          formValues,
          setCurrentContent,
          request,
          currentUser,
          dispatch
        )
      }
    >
      <Card>
        <b>
          Please enter the ages of any children in your household, separated by
          commas:
        </b>

        <Title level={5}>Head of Household Identifies as</Title>

        <Form.Item label="Ethnicity:">
          <Checkbox
            checked={formValues.hispanic}
            name="hispanic"
            onChange={handleCheckBoxChange}
          >
            Hispanic / Latinx
          </Checkbox>
        </Form.Item>

        <Form.Item label="Race:">
          <Checkbox
            checked={formValues.asian}
            onChange={handleCheckBoxChange}
            name="asian"
          >
            Asian
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.black}
            onChange={handleCheckBoxChange}
            name="black"
          >
            Black or African American
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.pacific}
            onChange={handleCheckBoxChange}
            name="pacific"
          >
            Native Hawaiian or Other Pacific Islander
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.white}
            onChange={handleCheckBoxChange}
            name="white"
          >
            White
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.native}
            onChange={handleCheckBoxChange}
            name="native"
          >
            Native American or Alaskan Native
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.demoNotSay}
            onChange={handleCheckBoxChange}
            name="demoNotSay"
          >
            Rather Not Say
          </Checkbox>
        </Form.Item>

        <Title level={5}>Gender</Title>

        <Divider dashed />

        <Form.Item
          hasFeedback
          initialValue={formValues.gender}
          name="gender"
          rules={[
            {
              required: true,
              message:
                'Please select the gender you most closely identify with',
            },
          ]}
        >
          <Select
            onChange={onGenderChange}
            showSearch
            placeholder="Select a gender you most closely identify with"
          >
            {genders.map(gender => (
              <Option value={gender}>{gender}</Option>
            ))}
          </Select>
        </Form.Item>

        <Title level={5}>
          Family Member Demographics (other than head of household)
        </Title>

        <Divider dashed />

        <Form.Item>
          <Checkbox
            checked={formValues.hispanic}
            name="hispanic"
            onChange={handleCheckBoxChange}
          >
            Hispanic/ Latino
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.asian}
            onChange={handleCheckBoxChange}
            name="asian"
          >
            Asian
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.black}
            onChange={handleCheckBoxChange}
            name="black"
          >
            Black or African American
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.pacific}
            onChange={handleCheckBoxChange}
            name="pacific"
          >
            Native Hawaiian or Other Pacific Islander
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.white}
            onChange={handleCheckBoxChange}
            name="white"
          >
            White
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.native}
            onChange={handleCheckBoxChange}
            name="native"
          >
            Native American or Alskan Native
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValues.demoNotSay}
            onChange={handleCheckBoxChange}
            name="demoNotSay"
          >
            Rather Not Say
          </Checkbox>
        </Form.Item>
        <Button htmlType="submit">Next</Button>
      </Card>
    </Form>
  );
}

const updateDemographics = async (
  formValues,
  setCurrentContent,
  request,
  currentUser,
  dispatch
) => {
  const {
    dob,
    childrenAges,
    hispanic,
    asian,
    black,
    pacific,
    white,
    native,
    demoNotSay,
    gender,
  } = formValues;

  const demographicsInfo = {
    childrenAges,
    hispanic,
    asian,
    black,
    pacific,
    white,
    native,
    demoNotSay,
  };

  const userInfo = {
    gender: formValues.gender,
  };

  try {
    await axiosWithAuth().put(`/requests/${request.id}`, demographicsInfo);
    await axiosWithAuth().put(`/users/me`, userInfo);

    if (currentUser.applicationStep === 'demographics') {
      await axiosWithAuth()
        .put('/users/me', {
          applicationStep: 'documents',
        })
        .then(res => dispatch(setCurrentUser(res.data.user)));
    }

    setCurrentContent('documents');
  } catch (error) {
    alert(error);
    console.log(error);
  } finally {
  }
};
