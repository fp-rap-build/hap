import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { isChecklistCompleted } from './utils';

import ApproveRequestModal from './components/ApproveRequestModal';

import {
  Basic,
  Checklist,
  Documents,
  Footer,
  TopActions,
  CommentsContainer,
  Contact,
} from './components';

import { Card, Input, message, Modal } from 'antd';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

import socket from '../../../../../config/socket';
import Address from './components/Address';
import Household from './components/Household';
import Demographics from './components/Demographics';

const tabListNoTitle = [
  {
    key: 'user',
    tab: 'User',
  },
  {
    key: 'address',
    tab: 'Address',
  },
  {
    key: 'household',
    tab: 'Household',
  },
  {
    key: 'demographics',
    tab: 'Demographics',
  },
  {
    key: 'contact',
    tab: 'Landlord',
  },
  {
    key: 'documents',
    tab: 'Documents',
  },
  {
    key: 'checklist',
    tab: 'Checklist',
  },
  { key: 'comments', tab: 'Comments' },
];

export default function Index({
  request,
  setRequest,
  documents,
  setDocuments,
  organizationId,
  programs,
  setPrograms,
}) {
  const currentUser = useSelector(state => state.user.currentUser);

  const [loading, setLoading] = useState(false);
  //eslint-disable-next-line
  const [tab, setTab] = useState('basic');

  const [modalContent, setModalContent] = useState('programSelection');

  const [preChecklistValues, setPreChecklistValues] = useState({
    pmApproval: request.pmApproval,
    verifiedDocuments: request.verifiedDocuments,
    verifiedLedger: request.verifiedLedger,
  });

  const [postChecklistValues, setPostChecklistValues] = useState({
    checkRequested: request.checkRequested,
    checkSent: request.checkSent,
    checkReceived: request.checkReceived,
  });

  const [isApprovedModalVisible, setIsApprovedModalVisible] = useState(false);

  const showApprovedModal = () => {
    setIsApprovedModalVisible(true);
  };

  const handleCancel = () => {
    setIsApprovedModalVisible(false);
    setModalContent('programSelection');
  };

  const pleaseFinishChecklistModal = () => {
    Modal.error({ title: 'Please finish everything on your checklist' });
  };

  const deniedModal = (onOk, message) => {
    Modal.confirm({
      title:
        "Are you sure you want to deny this user? This change can't be undone",
      onOk,
    });
  };

  const handleReviewSubmit = status => {
    const alreadyReviewed =
      request.requestStatus === 'approved' ||
      request.requestStatus === 'denied';

    if (alreadyReviewed) {
      return message.error('This request has already been reviewed');
    }

    let completedChecklist = isChecklistCompleted(preChecklistValues);

    if (!completedChecklist && status !== 'denied')
      return pleaseFinishChecklistModal();

    const handleDenial = async () => {
      try {
        await axiosWithAuth().put(`/requests/${request.id}`, {
          requestStatus: status,
          email: request.email,
        });

        socket.emit('requestChange', {
          requestId: request.id,
          senderId: currentUser.id,
          message: `${request.firstName}'s request has been denied`,
        });

        setRequest({ ...request, requestStatus: status });
      } catch (error) {
        alert('Failed to review user');
      }
    };

    if (status === 'approved') return showApprovedModal();
    if (status === 'denied') return deniedModal(handleDenial);
  };

  const handleCheckboxChange = async e => {
    const { name, checked } = e.target;

    if (name in preChecklistValues) {
      setPreChecklistValues({ ...preChecklistValues, [name]: checked });
    } else {
      setPostChecklistValues({ ...postChecklistValues, [name]: checked });
    }

    setRequest({ ...request, [name]: checked });

    // persist changes
    try {
      await axiosWithAuth().put(`/requests/${request.id}`, {
        [name]: checked,
      });

      // Send notification
      socket.emit('requestChange', {
        requestId: request.id,
        senderId: currentUser.id,
        message: `${currentUser.firstName} made an update to ${request.firstName}'s checklist`,
      });
    } catch (error) {
      message.error(
        'Unable to persist changes to checklist. Please report this'
      );
    }
  };

  const onTabChange = (key, type) => {
    setTab(key);
  };

  const props = {
    tab,
    handleReviewSubmit,
    handleCheckboxChange,
    request,
    documents,
    setDocuments,
  };

  const approveModalProps = {
    isApprovedModalVisible,
    setRequest,
    request,
    loading,
    handleCancel,
    programs,
    setPrograms,
    setModalContent,
    modalContent,
  };

  return (
    <div>
      <ApproveRequestModal {...approveModalProps} />

      <Card
        className="site-page-header-responsive"
        title={`Reviewing ${request.firstName} ${request.lastName}'s request; The Current Status is: ${request.requestStatus}`}
        tabList={tabListNoTitle}
        onTabChange={onTabChange}
        activeTabKey={tab}
        style={{ minHeight: '550px', width: '100%' }}
        extra={[
          <TopActions
            handleReviewSubmit={props.handleReviewSubmit}
            request={request}
            setRequest={setRequest}
          />,
        ]}
      >
        <Content
          extra={
            tab !== 'comments' && tab !== 'checklist' ? (
              <Footer request={props.request} />
            ) : null
          }
        >
          {renderContent(props)}
        </Content>
      </Card>
    </div>
  );
}

const renderContent = props => {
  switch (props.tab) {
    case 'user':
      return <Basic request={props.request} />;
    case 'address':
      return <Address request={props.request} />;
    case 'household':
      return <Household request={props.request} />;
    case 'demographics':
      return <Demographics request={props.request} />;
    case 'contact':
      return <Contact request={props.request} />;
    case 'checklist':
      return (
        <Checklist
          handleCheckboxChange={props.handleCheckboxChange}
          request={props.request}
        />
      );
    case 'documents':
      return (
        <Documents
          documents={props.documents}
          setDocuments={props.setDocuments}
        />
      );
    case 'comments':
      return <CommentsContainer request={props.request} />;
    default:
      return <Basic request={props.request} />;
  }
};

const Content = ({ children, extra }) => (
  <div className="content" styles={{ gap: '3rem' }}>
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);
