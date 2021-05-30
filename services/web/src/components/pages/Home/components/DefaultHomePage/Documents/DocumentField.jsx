import socket from '../../../../../../config/socket';

import DocumentUploader from './DocumentUploader';

import { Upload, Row, Col, Typography } from 'antd';

const { Dragger } = Upload;
const { Title, Paragraph } = Typography;

const DocumentField = ({ category, title, blurb, request }) => {
  return (
    <div className="documentField">
      <Title level={5}>{title}:</Title>
      <Row style={{ border: '1px solid red' }}>
        <Col span={8} style={{ border: '1px solid dodgerblue' }}>
          <Paragraph>{blurb}</Paragraph>
        </Col>
        <Col span={4} style={{ border: '1px solid dodgerblue' }}>
          Status
        </Col>
        <Col span={6} style={{ border: '1px solid dodgerblue' }}>
          <DocumentUploader request={request} category={category} />
        </Col>
        <Col span={6} style={{ border: '1px solid dodgerblue' }}>
          Checkbox
        </Col>
      </Row>
    </div>
  );
};

export default DocumentField;
