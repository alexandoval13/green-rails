// Read Data From CSV
export function parseCSV(filename, text) {
  const lines = text.trim().split('\n');

  // list of header labels
  const headers = lines[0].split(',');

  // return an array of line objects sorted in "header label: line value" pairs
  const rows = lines.slice(1).map((line) => {
    const values = line.split(',');
    const lineObj = {};

    headers.forEach((header, i) => {
      lineObj[header] = values[i];
    });

    return lineObj;
  });

  return { headers, rows, text };
}

export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // read data from CSV file
    reader.onload = function (event) {
      const text = event.target.result;

      const data = parseCSV(file.name, text);
      resolve(data);
    };

    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// Export Data to Local CSV
export function exportTableToCSV(e, filename = 'greenRailsData.csv') {
  e.preventDefault();

  const table = document.getElementById('data-table');
  if (!table) {
    alert('Could not find table');
    return;
  }

  let csv = [];

  const rows = table.querySelectorAll('tr');

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll('th, td'));
    const rowData = [];

    for (const cell of cells) {
      let cellValue = cell.innerText;
      if (
        cellValue.includes(',') ||
        cellValue.includes('"') ||
        cellValue.includes('\n')
      ) {
        cellValue = `"${cellValue.replace(/"/g, '""')}"`;
      }

      rowData.push(cellValue);
    }

    csv.push(rowData.join(','));
  }

  const csvString = csv.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // Create a temporary anchor element to trigger the download
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the object URL
  } else {
    alert(
      'Your browser does not support the download attribute. Use the code snippet to copy the CSV data from console.',
    );
  }
}
