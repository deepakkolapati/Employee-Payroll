$(document).ready(function() {
    $("#submit").click(function() {
        var name = $("#name").val();
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
    });
});
document.getElementById("submit").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const notes = document.getElementById("notes").value;
    const date = document.getElementById("date").value;
    const gender = document.getElementById("male").checked ? "male" : "female";
    const salary = document.getElementById("salary").value;
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

 
    var employeeData = {
        profile: image,
        Name: name,
        Notes: notes,
        Gender: gender,
        Department: departments,
        Salary: salary,
        Start_Date: date
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/user',
        data: JSON.stringify(employeeData),
        contentType: 'application/json',

    });

  
  
    console.log(employeeData);
});

document.getElementById('resetb').addEventListener('click',function(){
 document.getElementById('empform').reset() }

);