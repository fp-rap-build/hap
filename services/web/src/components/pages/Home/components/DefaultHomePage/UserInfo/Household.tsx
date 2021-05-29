import EditableNum from '../../common/EditableNum';

import { Typography, Checkbox, Divider } from 'antd';

const Household = ({
  requestData,
  handleNumChange,
  setRequestData,
  handleRequestChange,
}) => {
  return (
    <div className="householdInfo userInfoContent">
      <Typography.Title level={4}>Household Info:</Typography.Title>
      <Divider />
      <Checkbox
        checked={requestData.foodWrkr}
        name="foodWrkr"
        onChange={handleRequestChange}
      >
        Worked in Food Service
      </Checkbox>
      <Checkbox
        checked={requestData.unEmp90}
        name="unEmp90"
        onChange={handleRequestChange}
      >
        Unemployed in the past 90 days
      </Checkbox>
      <EditableNum
        title="Family Size"
        name="familySize"
        handleNumChange={handleNumChange}
        state={requestData}
        setState={setRequestData}
      />
      <EditableNum
        title="Numbe of Children"
        name="numChildren"
        handleNumChange={handleNumChange}
        state={requestData}
        setState={setRequestData}
      />
      <EditableNum
        title="Monthly Income"
        name="monthlyIncome"
        handleNumChange={handleNumChange}
        state={requestData}
        setState={setRequestData}
      />
      <EditableNum
        title="Monthly Rent"
        name="monthlyRent"
        handleNumChange={handleNumChange}
        state={requestData}
        setState={setRequestData}
      />
    </div>
  );
};

export default Household;
