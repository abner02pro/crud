let users = JSON.parse(localStorage.getItem("users")) || [];
let editingIndex = -1;

function renderTable(data = users) {
  const table = document.getElementById("userTable");
  table.innerHTML = "";
  data.forEach((user, index) => {
    table.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button onclick="editUser(${index})">Editar</button>
          <button onclick="deleteUser(${index})">Eliminar</button>
        </td>
      </tr>`;
  });
}

function addUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  if (!name || !email) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (editingIndex === -1) {
    users.push({ name, email });
  } else {
    users[editingIndex] = { name, email };
    editingIndex = -1;
  }

  localStorage.setItem("users", JSON.stringify(users));
  clearForm();
  renderTable();
}

function editUser(index) {
  document.getElementById("name").value = users[index].name;
  document.getElementById("email").value = users[index].email;
  editingIndex = index;
}

function deleteUser(index) {
  if (confirm("¿Estás seguro de eliminar este usuario?")) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderTable();
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function searchUsers() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = users.filter(user => user.name.toLowerCase().includes(query));
  renderTable(filtered);
}

function exportCSV() {
  let csv = "Nombre,Correo\n";
  users.forEach(u => csv += `${u.name},${u.email}\n`);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "usuarios.csv";
  link.click();
}

renderTable();
