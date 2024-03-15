$(document).ready(function() {
  $('#employeeData').on('click', '.deletebutton', function() {
      const idToDelete = $(this).data('id');
      if (idToDelete) {
          const confirmDelete = confirm('Are you sure you want to delete this row?');
          if (confirmDelete) {
              deleteRow(idToDelete, $(this));
          }
      } else {
          console.error('Invalid data-id attribute for delete button');
      }
  });

  function deleteRow(id, buttonElement) {
      $.ajax({
          url: `http://localhost:3000/user/${id}`,
          type: 'DELETE',
          success: function() {
              console.log('User deleted successfully');
              buttonElement.closest('tr').remove();
          },
          error: function(xhr, status, error) {
              console.error('Error deleting user:', xhr.responseText);
          }
      });
  }

  // Fetch and display users on page load
  function fetchUsers() {
      $.getJSON("http://localhost:3000/user", function(data) {
          data.forEach(user => {
              const row = createRow(user);
              $('#employeeData').append(row);
          });
      });
  }

  function createRow(user) {
      const row = `
          <tr>
              <td><img src="${user.profile}" alt="Profile" width="50"></td>
              <td>${user.Name}</td>
              <td>${user.Gender}</td>
              <td>${user.Department}</td>
              <td>${user.Salary}</td>
              <td>${user.Start_Date}</td>
              <td>
                  <button class="edits" onclick="editRecord(${user.id})"><i class="fa-solid fa-pen"></i></button>
                  <button class="deletebutton" data-id="${user.id}"><i class="fa-solid fa-trash"></i></button>
              </td>
          </tr>
      `;
      return row;
  }

  // Call fetchUsers to populate the table
  fetchUsers();
});