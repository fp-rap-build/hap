import TextField from '@material-ui/core/TextField';

import {
  getGridStringOperators,
  getGridDateOperators,
} from '@material-ui/x-grid';

const addCustomOperators = setColumns => {
  setColumns(cols => {
    return cols.map(col => {
      if (col?.type === 'date') {
        col['filterOperators'] = getGridDateOperators();

        return col;
      } else {
        col['filterOperators'] = getGridStringOperators();
      }

      col['filterOperators'].push({
        label: 'is not',
        value: 'isNot',
        getApplyFilterFn: filterItem => {
          if (
            !filterItem.columnField ||
            !filterItem.value ||
            !filterItem.operatorValue
          ) {
            return null;
          }

          return params => {
            return !filterItem.value.includes(params.value);
          };
        },
        InputComponent: InputComponent,
      });

      return col;
    });
  });
};

const InputComponent = props => {
  const { item, applyValue } = props;

  const handleFilterChange = event => {
    applyValue({ ...item, value: event.target.value });
  };

  return (
    <TextField
      style={{
        marginTop: '1rem',
      }}
      name="custom-rating-filter-operator"
      placeholder="Filter value"
      value={item.value}
      onChange={handleFilterChange}
    />
  );
};

export default addCustomOperators;
