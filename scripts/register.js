$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    // Function to populate form data for edit mode
    function populateForm(user) {
        $('#name').val(user.Name);
        $('#notes').val(user.Notes);
        $('#date').val(user.Start_Date);
        $('input[name="gender"][value="' + user.Gender + '"]').prop('checked', true);
        $('#salary').val(user.Salary);
        $('input[name="profile"][value="' + user.profile + '"]').prop('checked', true);

        const deptIdMap = {
            'HR': 'dept1',
            'Sales': 'dept2',
            'Finance': 'dept3',
            'Engineer': 'dept4',
            'Others': 'dept5'
        };
    
        // Check departments based on user data
        user.Department.forEach(dept => {
            const deptId = deptIdMap[dept];
            if (deptId) {
                $('#' + deptId).prop('checked', true);
            }
        });

        // Change submit button text to "Update"
        $('#submit').text('Update');
    }

    if (userId) {
        fetch(`http://localhost:3000/user/${userId}`)
            .then(response => response.json())
            .then(user => populateForm(user))
            .catch(error => console.error('Error fetching user data:', error));
    }

    // Submit form data
    $("#submit").click(function() {
        const name = $("#name").val();
        if (name.length < 3) {
            alert("Name must be at least 3 characters long.");
            return;
        }
        if ($("input[name='gender']:checked").length === 0) {
            alert("Please select gender.");
            return;
        }
        if ($("#salary").val() === "Select") {
            alert("Please select salary.");
            return;
        }
        if ($("#date").val() === "") {
            alert("Please select start date.");
            return;
        }

        alert("Form submitted successfully!");

        // Additional code for submitting form data via AJAX
        const gender = $('input[name="gender"]:checked').val();
        const salary = $('#salary').val();
        const image = $('input[name="profile"]:checked').val();
        const departments = [];
        if (document.getElementById("dept1").checked) {
            departments.push("HR");
        }
        if (document.getElementById("dept2").checked) {
            departments.push("Sales");
        }
        if (document.getElementById("dept3").checked) {
            departments.push("Finance");
        }
        if (document.getElementById("dept4").checked) {
            departments.push("Engineer");
        }
        if (document.getElementById("dept5").checked) {
            departments.push("Others");
        }
    

        const employeeData = {
            profile: image,
            Name: name,
            Notes: $('#notes').val(),
            Gender: gender,
            Department: departments,
            Salary: salary,
            Start_Date: $('#date').val()
        };

        // Adjust AJAX URL based on edit or create mode
        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `http://localhost:3000/user/${userId}` : 'http://localhost:3000/user';

        $.ajax({
            type: method,
            url: url,
            data: JSON.stringify(employeeData),
            contentType: 'application/json',
            success: function(response) {
                alert('User saved successfully!');
                window.location.href = '/pages/dashboard.html'; // Redirect after successful submission
            },
            error: function(xhr, status, error) {
                console.error('Error saving user:', xhr.responseText);
            }
        });
    });

    // Reset form data
    $('#resetb').click(function() {
        document.getElementById('empform').reset();
        $('#submit').text('Submit'); // Reset submit button text
    });
});


function redirect() {
    window.location.href = '/pages/dashboard.html';
}

function resetForm() {
    // Reset input field values
    document.getElementById('name').value = '';
    document.getElementById('profile1').checked = false;
    document.getElementById('profile2').checked = false;
    document.getElementById('profile3').checked = false;
    document.getElementById('profile4').checked = false;
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = false;
    document.getElementById('dept1').checked = false;
    document.getElementById('dept2').checked = false;
    document.getElementById('dept3').checked = false;
    document.getElementById('dept4').checked = false;
    document.getElementById('dept5').checked = false;
    document.getElementById('salary').selectedIndex = 0;
    document.getElementById('date').value = '';
    document.getElementById('notes').value = ''; }