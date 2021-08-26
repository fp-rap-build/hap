import React from 'react';

import MailIcon from '@material-ui/icons/Mail';

import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';

import { useDispatch, useSelector } from 'react-redux';

import Container from './Container';

import { axiosWithAuth } from '../../../../../../../api/axiosWithAuth';

import { message, Modal } from 'antd';

import socket from '../../../../../../../config/socket';

import {
  addSubscription,
  deleteSubscription,
} from '../../../../../../../redux/users/userActions';

export default function Subscribe({ setRequests, currentRequest }) {
  const { isSubscribed, id } = currentRequest;

  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);

  const handleClick = () => {
    if (isSubscribed)
      return unSubscribeFromRequest(setRequests, id, currentUser, dispatch);

    return subscribeToRequest(setRequests, id, dispatch);
  };

  return (
    <Container onClick={handleClick}>
      <RenderIcon isSubscribed={isSubscribed} />
    </Container>
  );
}

const RenderIcon = ({ isSubscribed }) => {
  if (isSubscribed) return <UnsubscribeIcon />;

  return <MailIcon />;
};

const unSubscribeFromRequest = (setData, requestId, currentUser, dispatch) => {
  Modal.confirm({
    title: 'Are you sure you want to unsubscribe from this request?',
    content: 'You will stop receiving notifications',
    onOk: () => {
      setData(prevState =>
        prevState.filter(request => {
          if (request.id === requestId) {
            request['isSubscribed'] = false;
          }

          return request;
        })
      );

      let subscription = currentUser.subscriptions.find(
        sub => sub.requestId === requestId
      );

      axiosWithAuth()
        .delete(`/subscriptions/${subscription.id}`)
        .then(res => console.log(res.data))
        .catch(err => message.error('Unable to unsubscribe from request'));

      socket.emit('leaveRequest', requestId);
      dispatch(deleteSubscription(subscription.id));
    },
  });
};

const subscribeToRequest = async (setData, requestId, dispatch) => {
  try {
    // Update table
    setData(prevState =>
      prevState.map(request => {
        if (requestId === request.id) {
          request['isSubscribed'] = true;
        }
        return request;
      })
    );

    // Persist new subscription
    let subscription = await axiosWithAuth()
      .post('/subscriptions', { requestId })
      .then(res => res.data.subscription);

    // Join request to receive notifications
    socket.emit('joinRequest', requestId);

    // Lastly, update current users state
    dispatch(addSubscription(subscription));
  } catch (error) {
    console.log(error);

    message.error('Unable to subscribe to request');
  }
};
