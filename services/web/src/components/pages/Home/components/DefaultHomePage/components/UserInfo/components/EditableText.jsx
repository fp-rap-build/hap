import { Typography, Row, Col, Input } from 'antd';

import '../../../../../../../../styles/pages/Home/homeComponents.less';

const { Paragraph, Text } = Typography;

export default function EditableText({ name, title, handleChange, data }) {
  return (
    <div>
      <Row>
        <Col span={8}>
          <Text strong>{title}: </Text>
        </Col>
        <Col span={16}>
          <Input
            size="large"
            name={name}
            onChange={handleChange}
            value={data[name]}
          />
        </Col>
      </Row>
    </div>
  );
}
