import React from 'react';

import { Button } from 'antd';
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
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis laborum
          aut ducimus dignissimos sapiente eveniet nisi impedit odio, vel natus
          eum quas voluptatum rerum esse at. Officia consequatur accusantium
          maxime?
        </h3>
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
