import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  createIncome,
  updateIncome,
  deleteIncome,
} from '../../../../../../redux/requests/requestActions';

import MaterialTable from '@material-table/core';

import { tableIcons } from '../../../../../../utils/tableIcons';

import { Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const Income = ({ requestData }) => {
  const dispatch = useDispatch();

  const initialIncomes = useSelector(state => state.requests.incomes);

  const [tableState, setTableState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      {
        title: 'Source of Income',
        field: 'sourceOfIncome',
        lookup: {
          wages: 'Wages',
          publicAssistance: 'Public Assistance',
          pensionRetirement: 'Pension/ Retirement',
          unemploymentDissability: 'Unemployment or Disability',
          alimony: 'Alimony/ Child Support',
        },
      },
      { title: 'Amount', field: 'amount', type: 'numeric' },
      {
        title: 'Pay Period',
        field: 'payPeriod',
        lookup: {
          weekly: 'Weekly',
          biweekly: 'Biweekly',
          monthly: 'Monthly',
        },
      },
    ],
    data: initialIncomes,
  });

  return (
    <div className="incomeInfo userInfoContent">
      <div classname="userContentHeading">
        <Title level={4}>Income Information</Title>
        <Paragraph>
          Please provide the amount of income you receive, how often you receive
          it, and the source of income. Verification of your income will need to
          be completed prior to making a final decision on your request for
          assistance.
        </Paragraph>
      </div>
      <Divider />
      <MaterialTable
        icons={tableIcons}
        title="Household Incomes"
        columns={tableState.columns}
        data={tableState.data}
        editable={{
          isDeletable: rowData => rowData !== null,
          isEditable: rowData => rowData !== null,
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              resolve();

              setTableState({
                ...tableState,
                data: tableState.data.map(row => {
                  if (row.id === oldData.id) {
                    return newData;
                  }
                  return row;
                }),
              });

              delete newData.tableData;

              dispatch(updateIncome(newData));
            }),
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              resolve();

              //Adding request ID
              const completeData = { ...newData, requestId: requestData.id };

              setTableState({
                ...tableState,
                data: [...tableState.data, completeData],
              });

              dispatch(createIncome(completeData));
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              resolve();

              if (oldData.id) {
                dispatch(deleteIncome(oldData.id));
              }

              //Filter state to remove correct income then set new table state
              const newState = tableState.data.filter(
                income => income.tableData.id !== oldData.tableData.id
              );

              setTableState({ ...tableState, data: newState });
            }),
        }}
        options={{
          search: false,
        }}
      />
    </div>
  );
};
export default Income;
