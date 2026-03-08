import { parseCSV, readFile, exportTableToCSV } from '../scripts/parseCSV.js';

/** Creates the table elements */
const tableContainer = document.getElementById('table-container');

const downloadButton = document.createElement('button');
downloadButton.hidden = true;
downloadButton.innerHTML = 'Download';
downloadButton.addEventListener('click', (e) => exportTableToCSV(e));

const dataKey = localStorage.getItem('green-rails-data-key');
const headerList = ['name', 'date planted', 'date germinated'];

const TABLE_FORM_ID = 'table-input-form';

/** TODO: UTILS */
function formatValue(val) {
  let cleanValue = (val || '').trim(); // Trim first to handle hidden spaces

  if (cleanValue.startsWith('"') && cleanValue.endsWith('"')) {
    cleanValue = cleanValue.slice(1, -1);
  }

  return cleanValue;
}

function handleTableSubmit(e) {
  e.preventDefault();

  const data = new FormData(e.target);
  const dataObject = Object.fromEntries(data.entries());

  // console.log('click', { name });
  if (!dataObject[`${TABLE_FORM_ID}-name`]) {
    alert('whoops, nothing new');
    return;
  }

  const values = [
    dataObject[`${TABLE_FORM_ID}-name`],
    dataObject[`${TABLE_FORM_ID}-date-planted`],
    dataObject[`${TABLE_FORM_ID}-date-germinated`],
    'edit',
  ];

  const newLine = values.join(',');

  const key = localStorage.getItem('green-rails-data-key');
  const lines = `${localStorage.getItem(
    localStorage.getItem('green-rails-data-key'),
  )}`
    .trim()
    .split('\n');

  const header = lines[0];
  const body = lines.slice(1).join('\n');

  const newText = `${header}\n${newLine}\n${body}`;
  console.log(newText);

  localStorage.setItem(key, newText);

  const tbody = document.querySelector('#data-table tbody');

  if (!tbody) {
    alert('creating new table...');
  } else {
    const newRow = tbody.insertRow(1);
    values.forEach((val, index) => {
      const cell = newRow.insertCell(index);
      cell.textContent = val;
    });
  }

  event.target.reset();
}

function renderTable(headers = [], rows = []) {
  // clear the table container
  tableContainer.textContent = '';

  // create the form element for input row
  const tableForm = document.createElement('form');
  tableForm.id = TABLE_FORM_ID;
  tableForm.addEventListener('submit', handleTableSubmit);

  tableContainer.appendChild(tableForm);

  // build the table
  const table = document.createElement('table');
  table.id = 'data-table';

  // add table header
  const thead = document.createElement('thead');
  table.appendChild(thead);

  const headerRow = document.createElement('tr');

  headers.forEach((h) => {
    const th = document.createElement('th');
    th.textContent = formatValue(h);
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);

  // add table body
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  // add input data row in body
  const tr = tbody.insertRow(-1);
  headers.forEach((h, i) => {
    const td = document.createElement('td');
    let el;

    if (i == headers.length - 1) {
      el = createInputElement('submit', `${TABLE_FORM_ID}-submit`, null, 'Add');
      el.type = 'submit';
      el.textContent = 'Add';
    } else {
      console.log({ h: h.split(' ').join('-') });
      el = createInputElement(
        'text',
        `${TABLE_FORM_ID}-${h.split(' ').join('-')}`,
      );
    }

    el.setAttribute('form', `${TABLE_FORM_ID}`);

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
