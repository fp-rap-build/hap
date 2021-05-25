import { Typography, Row, Col, InputNumber } from 'antd';

const { Text } = Typography;

export default function EditableNum({
  title,
  name,
  handleNumChange,
  state,
  setState,
}) {
  return (
    <div>
      <Row>
        <Col span={8}>
          {' '}
          <Text strong>{title}: </Text>
        </Col>
        <Col span={16}>
          <InputNumber
            size="large"
            onChange={handleNumChange(name, setState, state)}
            value={state[name]}
          />
        </Col>
      </Row>
    </div>
  );
}
