import DocumentUploader from '../DocumentUploader';

import { Modal, Typography } from 'antd';
const { Title } = Typography;

const UploadDocModal = ({
  uploadModalVisibility,
  handleAcknowledge,
  handleCancel,
  selectedCategory,
  request,
  tableData,
  updateLocalStatuses,
}) => {
  return (
    <>
      <Modal
        title={<Title level={5}>Upload Document</Title>}
        askClosable={false}
        visible={uploadModalVisibility}
        onOk={handleAcknowledge}
        onCancel={handleCancel}
        bodyStyle={{ height: '20vh' }}
      >
        <DocumentUploader
          request={request}
          category={selectedCategory}
          tableData={tableData}
          updateLocalStatuses={updateLocalStatuses}
        />
      </Modal>
    </>
  );
};

export default UploadDocModal;
