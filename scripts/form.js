// const title = document.getElementById('title');
// const main = document.getElementById('main');
// const form = document.getElementById('new-data-form');

// function createInputElement(type, id, placeholder = '', value = '') {
//   const input = document.createElement('input');

//   input.type = type;
//   input.id = id;
//   input.name = id;
//   input.value = value;
//   input.placeholder = placeholder;

//   return input;
// }

// function createLabelElement(forName, innerHTML = '') {
//   const label = document.createElement('label');
//   label.for = forName;
//   label.innerHTML = innerHTML;

//   return label;
// }

// // FORM ELEMENTS
// const rowName = document.createElement('div');
// const labelName = createLabelElement('input-name', 'name');
// const inputName = createInputElement('text', 'input-name', 'cucumber');
// [labelName, inputName].forEach((el) => rowName.appendChild(el));

// const rowDate = document.createElement('div');
// const labelDate = createLabelElement('input-seed-date', 'date');
// const inputDate = createInputElement(
//   'text',
//   'input-seed-date',
//   new Date().toLocaleDateString(),
// );
// [labelDate, inputDate].forEach((el) => rowDate.appendChild(el));

// const addButton = createInputElement('submit', 'submitButton', null, 'Add');

// const formElements = [rowName, rowDate, addButton];
// formElements.forEach((el) => form.appendChild(el));

// // FORM EVENTS
// let listData = new Map();
// const handleSubmit = (e) => {
//   e.preventDefault();

//   const name = document.getElementById('input-name').value;
//   const seedDate = document.getElementById('input-seed-date').value;
//   const germinationDate = ''; // TODO

//   console.log('click', { name });
//   if (!name) return;

//   const string = [name, seedDate, germinationDate, 'edit'].join(',');

//   const key = localStorage.getItem('green-rails-data-key');
//   const text = `${localStorage.getItem(
//     localStorage.getItem('green-rails-data-key'),
//   )}\n${string}`;
//   localStorage.setItem(key, text);

//   const tbody = document.querySelector('#data-table tbody');

//   if (!tbody) {
//     alert('creating new table...');
//   } else {
//     const newRow = tbody.insertRow(-1);
//     const data = [name, seedDate];
//     data.forEach((val, index) => {
//       const cell = newRow.insertCell(index);
//       cell.textContent = val;
//     });
//   }

//   event.target.reset();
// };

// form.addEventListener('submit', handleSubmit);
