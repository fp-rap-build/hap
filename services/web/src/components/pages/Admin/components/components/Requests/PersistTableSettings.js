const updateTableWithConfig = (setColumns, tableName) => {
  let savedColumnsConfig = JSON.parse(localStorage.getItem(tableName));

  if (!savedColumnsConfig) return;

  setColumns(prevState => {
    return prevState.map(col => {
      savedColumnsConfig.forEach(savedCol => {
        if (savedCol['field'] == col.field) {
          col['hide'] = savedCol['hide'];
          col['width'] = savedCol['width'];
        }
      });

      return col;
    });
  });
};

const onColumnVisibilityChange = async (e, tableName) => {
  let updatedColumn = e.colDef;

  let columns = e.api.current.getAllColumns();

  columns = columns.map(col => {
    if (col['field'] === e['field']) {
      col['hide'] = updatedColumn['hide'];
      col['width'] = updatedColumn['width'];
    }
    return col;
  });

  localStorage.setItem(tableName, JSON.stringify(columns));
};

export { updateTableWithConfig, onColumnVisibilityChange };
