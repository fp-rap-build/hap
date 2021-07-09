import React from 'react';

import { Modal, Input, message } from 'antd';

import { axiosWithAuth } from '../../../../../../api/axiosWithAuth';

export default function FinalReviewModal({
  visible,
  setVisible,
  showApprovedModal,
  request,
  setRequest,
}) {
  const handleFinalReview = () => {
    setVisible(false);
    showApprovedModal();
  };

  return (
    <Modal
      title={'Final Review'}
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={handleFinalReview}
    >
      <h1>Final review</h1>
    </Modal>
  );
}
