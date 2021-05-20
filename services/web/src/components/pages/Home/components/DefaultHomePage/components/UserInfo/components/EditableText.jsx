import { Typography, Row, Col } from 'antd';

import '../../../../../../../../styles/pages/Home/homeComponents.less';

const { Paragraph, Text } = Typography;

export default function EditableText({ state, setState, name }) {
  return (
    <div className="editableTextContainer">
      <Row>
        <Col span={6}>
          <Text strong>{name}:</Text>
        </Col>
        <Col span={18}>
          <Paragraph editable={{ onChange: setState }}>{state}</Paragraph>
        </Col>
      </Row>
    </div>
  );
}
