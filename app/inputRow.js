function addInputDataRow() {
  const table = getElementById('data-table');
  const headers = getElementById('#data-table, thead');

  console.log({ headers });
  const inputRow = table.insertRow(0);
}
