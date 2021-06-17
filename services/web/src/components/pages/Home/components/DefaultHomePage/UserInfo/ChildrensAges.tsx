import { useState } from 'react';

import { Form, Select, Button } from 'antd';
const { Option } = Select;

const ChildrensAges = ({
  childrensAges,
  disabled,
  handleAgeChange,
  addChild,
  removeChild,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);

    try {
      await addChild();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await removeChild();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {childrensAges.map(age => (
        <div style={{ marginRight: '5%' }}>
          <Form.Item
            label={'Child Age'}
            required
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Invalid age',
                pattern: RegExp(/^([0-9][0-8]?)\s*$/),
              },
            ]}
          >
            <Select
              disabled={disabled}
              value={age.age}
              onChange={handleAgeChange(age.id)}
              // style={{ width: '100%' }}
            >
              {childrensAgesRange.map(age => (
                <Option key={age} value={age}>
                  {age}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      ))}
      <div style={{ paddingTop: '5px', display: 'flex' }}>
        <Button
          loading={loading}
          disabled={disabled}
          onClick={handleAdd}
          style={{ marginRight: '5%' }}
        >
          Add Child
        </Button>
        <Button
          loading={loading}
          disabled={disabled}
          onClick={handleDelete}
          style={childrensAges ? null : { display: 'none' }}
        >
          Remove Child
        </Button>
      </div>
    </div>
  );
};

const childrensAgesRange = [
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
