document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/user')
      .then(response => response.json())
      .then(data => {
        const userData = document.getElementById('employeeData');
        data.forEach(user => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><img src="${user.profile}" alt="Profile" width="50"></td>
            <td>${user.Name}</td>
            <td>${user.Gender}</td>
            <td>${user.Department.join(', ')}</td>
            <td>${user.Salary}</td>
            <td>${user.Start_Date}</td>
            <td><button >Edit</button><button>Delete</button></td>

          `;
          userData.appendChild(row);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  });