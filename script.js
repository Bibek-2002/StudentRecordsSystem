const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const rollInput = document.getElementById('roll');
const phoneInput = document.getElementById('phone');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

let records = JSON.parse(localStorage.getItem('records')) || [];
console.log(records.length);

function displayRecords(filter = '') {
  recordList.innerHTML = '';
  let filteredRecords = records;
  if (filter) {
    filteredRecords = records.filter(record => record.name.toLowerCase().includes(filter.toLowerCase()));
  }

  if (filteredRecords.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6" style="text-align:center;color:red;">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    filteredRecords.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${record.name}</td>
                    <td>${record.age}</td>
                    <td>${record.roll}</td>
                    <td>${record.phone}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}

recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const age = ageInput.value;
  const roll = rollInput.value;
  const phone = phoneInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if (isDuplicateRoll(roll) && editIndex === -1) {
    alert('Student with this roll number already exists.');
    return;
  }

  if (editIndex === -1) {
    records.push({ name, age, roll, phone });
  } else {
    records[editIndex] = { name, age, roll, phone };
    editIndexInput.value = -1;
  }

  localStorage.setItem('records', JSON.stringify(records));
  nameInput.value = '';
  ageInput.value = '';
  rollInput.value = '';
  phoneInput.value = '';
  displayRecords();
});

function isDuplicateRoll(roll) {
  return records.some(record => record.roll === roll);
}

searchButton.addEventListener('click', function() {
  displayRecords(searchInput.value);
});

function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  ageInput.value = recordToEdit.age;
  rollInput.value = recordToEdit.roll;
  phoneInput.value = recordToEdit.phone;
  editIndexInput.value = index;
}

function deleteRecord(index) {
  displayRecords();
  let delBtn = document.querySelectorAll('.deleteButton');
  console.log(delBtn);
  delBtn[
    index
  ].innerHTML = `<i id="yesBtn" onclick="confirmDelete(${index})" class="fa-solid fa-check"></i><i id="noBtn" onclick="resetDelete(${index})" class="fa-solid fa-xmark"></i>`;
}

function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function resetDelete(index) {
  displayRecords();
}
displayRecords();
