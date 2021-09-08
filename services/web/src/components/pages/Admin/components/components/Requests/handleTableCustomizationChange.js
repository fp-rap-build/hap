const handleTableCustomizationChange = (columns, tableName) => {
  let newColumns = JSON.stringify(columns);

  localStorage.setItem(tableName, newColumns);
};
