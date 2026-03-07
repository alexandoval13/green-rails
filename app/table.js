import { parseCSV, readFile, exportTableToCSV } from '../scripts/parseCSV.js';

/** Creates the table elements */
const tableContainer = document.getElementById('data-container');

const downloadButton = document.createElement('button');
downloadButton.hidden = true;
downloadButton.innerHTML = 'Download';
downloadButton.addEventListener('click', (e) => exportTableToCSV(e));

const dataKey = localStorage.getItem('green-rails-data-key');
const headerList = ['name', 'date planted', 'date germinated'];

/** TODO: UTILS */
function formatValue(val) {
  let cleanValue = (val || '').trim(); // Trim first to handle hidden spaces

  if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
    cleanValue = cleanValue.slice(1, -1);
  }

  return cleanValue;
}

// TODO: FIX IN TABLE FORM
const tableForm = document.createElement('form');
tableForm.id = 'data-form';
tableForm.addEventListener('submit', handleSubmit);
console.log({ tableForm });
tableContainer.appendChild(tableForm);

function renderTable(headers = [], rows = []) {
  tableContainer.textContent = '';

  const table = document.createElement('table');
  table.id = 'data-table';

  // add header
  const thead = document.createElement('thead');
  table.appendChild(thead);

  const headerRow = document.createElement('tr');

  headers.forEach((h) => {
    const th = document.createElement('th');
    th.textContent = formatValue(h);
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);

  // add body
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  // add input data row in body
  const tr = tbody.insertRow(-1);
  headers.forEach((h, i) => {
    const td = document.createElement('td');
    let el;

    if (i == headers.length - 1) {
      el = createInputElement('submit', 'submitButton', null, 'Add');
      el.type = 'submit';
      el.textContent = 'Add';
    } else {
      el = createInputElement('text', `input-${h}`);
    }

    el.setAttribute('form', 'data-form');

    td.appendChild(el);
    tr.appendChild(td);
  });

  rows.forEach((row) => {
    const tr = tbody.insertRow(-1);

    headers.forEach((h) => {
      const td = document.createElement('td');
      td.textContent = formatValue(row[h]);

      tr.appendChild(td);
    });
  });

  tableContainer.appendChild(table);
  tableContainer.appendChild(downloadButton);

  if (headers.length && rows.length) {
    downloadButton.hidden = false;
  } else {
    downloadButton.hidden = true;
  }
}

if (dataKey && localStorage.getItem(dataKey)) {
  const text = localStorage.getItem(dataKey);
  const data = parseCSV(dataKey, text);

  if (data.headers.length && data.rows.length) {
    renderTable(data.headers, data.rows);
  }
} else {
  renderTable(headerList);
}

// File Input CTA
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'csv-file';
fileInput.accept = 'csv';

fileInput.addEventListener('change', async function (e) {
  const file = e.target.files[0];

  const data = await readFile(file);
  renderTable(data.headers, data.rows);

  // update local storage data from upload ONLY if there is text data
  if (file.name && data.text) {
    localStorage.setItem('green-rails-data-key', file.name);
    localStorage.setItem(file.name, data.text);
  }
});
tableContainer.appendChild(fileInput);
