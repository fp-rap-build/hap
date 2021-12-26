function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const requestSearch = (searchValue, setSearchText, data, setRows) => {
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

export default requestSearch;
