import { useEffect, useState } from 'react';

import { isChecklistCompleted } from './utils';

import ApproveRequestModal from './components/ApproveRequestModal';

import {
  Basic,
  Checklist,
  Documents,
  Footer,
  TopActions,
  CommentsContainer,
} from './components';

import { Card, Input, message, Modal } from 'antd';
import { axiosWithAuth } from '../../../../../api/axiosWithAuth';

const tabListNoTitle = [
  {
    key: 'basic',
    tab: 'Basic',
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

    // if (alreadyReviewed) {
    //   return message.error('This request has already been reviewed');
    // }

    let completedChecklist = isChecklistCompleted(preChecklistValues);

    if (!completedChecklist) return pleaseFinishChecklistModal();

    const handleDenial = async () => {
      console.log(request);
      try {
        await axiosWithAuth().put(`/requests/${request.id}`, {
          requestStatus: status,
          email: request.email,
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
        title="Review"
        tabList={tabListNoTitle}
        onTabChange={onTabChange}
        activeTabKey={tab}
        style={{ minHeight: '400px', width: '100%' }}
        extra={[<TopActions handleReviewSubmit={props.handleReviewSubmit} />]}
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
    case 'basic':
      return <Basic request={props.request} />;
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
