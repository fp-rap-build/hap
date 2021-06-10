import { Form, Select, Button } from 'antd';
const { Option } = Select;

const ChildrensAges = ({
  childrensAges,
  disabled,
  handleAgeChange,
  addChild,
  removeChild,
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {childrensAges.map(age => (
        <div style={{ marginRight: '5%' }}>
          <Form.Item label={'Child Age'}>
            <Select
              disabled={disabled}
              value={age.age}
              onChange={handleAgeChange(age.id)}
              // style={{ width: '100%' }}
            >
              {childresnAgesRange.map(age => (
                <Option value={age}>{age}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      ))}
      <div style={{ paddingTop: '5px', display: 'flex' }}>
        <Button
          disabled={disabled}
          onClick={addChild}
          style={{ marginRight: '5%' }}
        >
          Add Child
        </Button>
        <Button disabled={disabled} onClick={removeChild}>
          Remove Child
        </Button>
      </div>
    </div>
  );
};

const childresnAgesRange = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
];

export default ChildrensAges;
