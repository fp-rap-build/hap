import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import React, { useState } from 'react';

const Comments = () => {
  // state for comments modal
  const [isCommentsModalVisible, setisCommentsModalVisible] = useState(false);
  const showCommentsModal = () => setisCommentsModalVisible(true);
  const handle_Comments_Modal_Ok = async () => {
    setisCommentsModalVisible(false);
    await axios.post('/comments', comment);
  };
  const handle_Comments_Modal_Cancel = () => setisCommentsModalVisible(false);

  const comment = (
    <div>
      <p>Comments: </p>
      <TextArea rows={5} />
    </div>
  );
  return (
    <>
      <Button type="primary" onClick={showCommentsModal}>
        Comments
      </Button>
      <Modal
        title="Comments Modal"
        visible={isCommentsModalVisible}
        onOk={handle_Comments_Modal_Ok}
        onCancel={handle_Comments_Modal_Cancel}
      >
        {comment}
      </Modal>
    </>
  );
};

export default Comments;
