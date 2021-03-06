import { useState } from 'react';

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

import { Card, message, Modal } from 'antd';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

import socket from '../../../../../config/socket';
import Address from './components/Address';
import Household from './components/Household';
import Demographics from './components/Demographics';
import FinalReviewModal from './components/FinalReviewModal';
import Advocate from './components/Advocate';

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
    key: 'advocate',
    tab: 'Advocate',
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
  ages,
}) {
  const currentUser = useSelector(state => state.user.currentUser);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);

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

  const [isFinalReviewModalVisible, setIsFinalReviewModalVisible] = useState(
    false
  );

  const showFinalReviewModal = () => {
    setIsFinalReviewModalVisible(true);
  };

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
    // const alreadyReviewed =
    //   request.requestStatus === 'approved' ||
    //   request.requestStatus === 'denied';

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

    if (status === 'approved') return showFinalReviewModal();
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
    setRequest,
    documents,
    setDocuments,
    ages,
    currentUser,
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
      <FinalReviewModal
        visible={isFinalReviewModalVisible}
        setVisible={setIsFinalReviewModalVisible}
        showApprovedModal={showApprovedModal}
        request={request}
        setRequest={setRequest}
        programs={programs}
      />

      <ApproveRequestModal {...approveModalProps} />

      <Card
        className="site-page-header-responsive"
        title={`Reviewing ${request.firstName} ${request.lastName}'s request; The Current Status is: ${request.requestStatus}`}
        tabList={tabListNoTitle}
        onTabChange={onTabChange}
        activeTabKey={tab}
        style={{ minHeight: '450px', width: '100%' }}
        key={request.id}
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
      return <Basic request={props.request} setRequest={props.setRequest} />;
    case 'address':
      return <Address request={props.request} setRequest={props.setRequest} />;
    case 'household':
      return (
        <Household
          request={props.request}
          setRequest={props.setRequest}
          currentUser={props.currentUser}
        />
      );
    case 'demographics':
      return (
        <Demographics
          request={props.request}
          setRequest={props.setRequest}
          currentUser={props.currentUser}
        />
      );
    case 'contact':
      return <Contact request={props.request} setRequest={props.setRequest} />;
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

    case 'advocate':
      return <Advocate request={props.request} setRequest={props.setRequest} />;

    case 'comments':
      return <CommentsContainer request={props.request} />;
    default:
      return <Basic request={props.request} setRequest={props.setRequest} />;
  }
};

const Content = ({ children, extra }) => (
  <div className="content" styles={{ gap: '3rem' }}>
    <div className="main">{children}</div>
    <div className="extra">{extra}</div>
  </div>
);
