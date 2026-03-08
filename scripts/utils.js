function createInputElement(type, id, placeholder = '', value = '') {
  const input = document.createElement('input');

  input.type = type;
  input.id = id;
  input.name = id;
  input.value = value;
  input.placeholder = placeholder;

  return input;
}

function createLabelElement(forName, innerHTML = '') {
  const label = document.createElement('label');
  label.for = forName;
  label.innerHTML = innerHTML;

  return label;
}
