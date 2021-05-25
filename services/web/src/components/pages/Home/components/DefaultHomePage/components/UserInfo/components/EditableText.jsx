import { Typography, Row, Col } from 'antd';

import '../../../../../../../../styles/pages/Home/homeComponents.less';

const { Paragraph, Text } = Typography;

export default function EditableText({
  displayInfo,
  setDisplayInfo,
  name,
  title,
}) {
  const handleChange = newText => {
    setDisplayInfo({ ...displayInfo, [name]: newText });
  };

  return (
    <div className="editableTextContainer">
      <Row>
        <Col span={6}>
          <Text strong>{title}:</Text>
        </Col>
        <Col span={18}>
          <Paragraph editable={{ onChange: handleChange }}>
            {displayInfo[name]}
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
