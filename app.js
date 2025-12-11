class User {
  constructor(data) {
    this.name = data.name ? `${data.name.first} ${data.name.last}` : 'Unknown Name';
    this.email = data.email || 'No email';
    this.gender = data.gender || 'Unknown';
    this.picture = data.picture ? data.picture.medium : '';
  }
}

let allUsers = []; // stored data

// loads content when window loads
window.onload = () => {
    loadUsers();
};

document.getElementById("filterMaleBtn").addEventListener("click", () => filterUsers("male"));
document.getElementById("filterFemaleBtn").addEventListener("click", () => filterUsers("female"));
document.getElementById("sortNameBtn").addEventListener("click", sortUsers);

const usersContainer = document.getElementById("usersContainer");

async function loadUsers() {
  const res = await fetch("https://randomuser.me/api/?results=12");
  const data = await res.json();

  // Debug: check the structure of the first user
  console.log("First user data:", data.results[0]);
  console.log("Name structure:", data.results[0].name);

  // create User objects
  allUsers = data.results.map(user => new User(user));

  displayUsers(allUsers);
}

function displayUsers(users) {
  usersContainer.innerHTML = "";

  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <img src="${user.picture}" />
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <p>${user.gender}</p>
    `;

    usersContainer.appendChild(card);
  });
}

function filterUsers(gender) {
  const filtered = allUsers.filter(user => user.gender === gender);
  displayUsers(filtered);
}

function sortUsers() {
  const sorted = [...allUsers].sort((a, b) => a.name.localeCompare(b.name));
  displayUsers(sorted);
}
