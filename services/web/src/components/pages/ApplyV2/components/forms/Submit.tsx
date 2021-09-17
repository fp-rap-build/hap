import React from 'react';

import { Button } from 'antd';

import { Form, Checkbox } from 'antd';

import { axiosWithAuth } from '../../../../../api/axiosWithAuth';
import { setCurrentUser } from '../../../../../redux/users/userActions';

import { useHistory } from 'react-router-dom';

export default function Submit({ setErrorMessage, request, dispatch }) {
  const history = useHistory();

  return (
    <div
      style={{
        width: '100%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >

        <br />
        <br />
        <h3>
          Thank you for completing all the steps and uploading your documents.
          Please review the final question below. Your request will not be able
          to be processed without granting us persmission to speak to other
          parties involved to verify your information and complete your request
          for Assistance.
        </h3>
        <Form>
          <Form.Item
            required
            rules={[
              {
                required: true,
                message:
                  'We cannot process your request without permission to speak to third parties regarding your request.ß',
              },
            ]}
          >
            <Checkbox name="advocate">
              By Checking this box you agree to allow Family Promise of Spokane
              to speak with your landlord and the city of Spokane to facilitate
              the processing of your request.
            </Checkbox>
          </Form.Item>
          <Button
            size="large"
            onClick={() =>
              submitApplication(
                request,
                dispatch,
                setErrorMessage,
                setCurrentUser,
                history
              )
            }
          >
            Submit
          </Button>
        </Form>

      </div>
    </div>
  );
}

const submitApplication = async (
  request,
  dispatch,
  setErrorMessage,
  setCurrentUser,
  history
) => {
  try {
    await axiosWithAuth().put(`/requests/${request.id}`, { incomplete: false });

    await axiosWithAuth()
      .put('/users/me', { applicationStep: 'completed' })
      .then(res => {
        dispatch(setCurrentUser(res.data.user));
        history.push('/');
      });
  } catch (error) {
    setErrorMessage(
      'Unable to update landlord info. Please report this or try again'
    );
  } finally {
  }
};
