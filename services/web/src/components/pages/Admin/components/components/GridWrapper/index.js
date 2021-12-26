import { useState, useEffect } from 'react';

import { XGrid } from '@material-ui/x-grid';

import ToolbarWithQuickSearch from '../GridHelpers/ToolBarWithQuickSearch';

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export default function GridWrapper(props) {
  const [isFetching, setIsFetching] = useState(false);

  const [data, setData] = useState([]);

  const [rows, setRows] = useState([]);

  const [columns, setColumns] = useState([]);

  const [searchText, setSearchText] = useState('');

  const requestSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        if (row[field]) return searchRegex.test(row[field].toString());

        return false;
      });
    });

    setRows(filteredRows);
  };

  useEffect(() => {
    setRows(data);
  }, [data]);

  return (
    <>
      <h2>Users</h2>

      <XGrid
        {...props}
        rows={rows}
        columns={columns}
        components={{
          Toolbar: ToolbarWithQuickSearch,
        }}
        componentsProps={{
          toolbar: {
            value: searchText,
            onChange: event => requestSearch(event.target.value),
            clearSearch: () => requestSearch(''),
          },
        }}
      />
    </>
  );
}
