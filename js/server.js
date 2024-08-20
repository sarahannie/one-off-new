var currentTab = 0; 
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  document.getElementById("prevBtn").style.display = n == 0 ? "none" : "inline";
  document.getElementById("nextBtn").innerHTML = n == (x.length - 1) ? "Submit" : "Next";
  fixStepIndicator(n);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  
  // Validate the current tab before proceeding
  if (n == 1 && !validateForm()) return false;

  // Hide the current tab
  x[currentTab].style.display = "none";

  // Update the current tab index
  currentTab += n;

  // If reaching the end of the form, submit the form
  if (currentTab >= x.length) {
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById('appointment-form').dispatchEvent(new Event('submit'));
    return false; 
  }

  // Show the next tab
  showTab(currentTab);
}

function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  
  // Check all inputs in the current tab
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }

  // If validation fails, alert the user
  if (!valid) {
    alert("Please input your information to continue.");
  } else {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  
  return valid; 
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  
  // Remove "active" class from all indicators
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  
  // Add "active" class to the current step indicator
  x[n].className += " active";
}

// Add event listener to handle the form submission
document.getElementById('appointment-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = {
      gname: document.getElementById('gname').value,
      gmail: document.getElementById('gmail').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value,
      whereHeard: document.querySelector('input[placeholder="Where did you hear about us?"]').value,
      adequateInsurance: document.querySelector('input[placeholder="Do you have adequate life insurance?"]').value,
      retirementPlan: document.querySelector('input[placeholder="Do you have a retirement plan?"]').value,
      reasonForInsurance: document.querySelector('input[placeholder="What is your reason to get life insurance?"]').value,
      productEducation: document.querySelector('input[placeholder="Education about the product?"]').value,
      retirementChoice: document.querySelector('input[placeholder="Would you want retirement by default or designer?"]').value,
      taxPreference: document.querySelector('input[placeholder="Would you want tax-free or taxable retirement?"]').value,
      maritalStatus: document.querySelector('input[placeholder="Are you married or single?"]').value,
      employmentStatus: document.querySelector('input[placeholder="Are you employed or unemployed?"]').value,
      additionalInfo: document.querySelector('input[placeholder="Any additional information?"]').value
  };

  // Send the form data to the server
  fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.text())
  .then(data => {
      alert(data); // Display server response
  })
  .catch(error => {
      console.error('Error:', error);
  });
});



  document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
        gname: document.getElementById('gname').value,
        gmail: document.getElementById('gmail').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value, // Newly added field
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        whereHeard: document.querySelector('input[placeholder="Where did you hear about us?"]').value, // Newly added field
        adequateInsurance: document.querySelector('input[placeholder="Do you have adequate life insurance?"]').value, // Newly added field
        retirementPlan: document.querySelector('input[placeholder="Do you have a retirement plan?"]').value, // Newly added field
        reasonForInsurance: document.querySelector('input[placeholder="What is your reason to get life insurance?"]').value, // Newly added field
        productEducation: document.querySelector('input[placeholder="Education about the product?"]').value, // Newly added field
        retirementChoice: document.querySelector('input[placeholder="Would you want retirement by default or designer?"]').value, // Newly added field
        taxPreference: document.querySelector('input[placeholder="Would you want tax-free or taxable retirement?"]').value, // Newly added field
        maritalStatus: document.querySelector('input[placeholder="Are you married or single?"]').value, // Newly added field
        employmentStatus: document.querySelector('input[placeholder="Are you employed or unemployed?"]').value, // Newly added field
        additionalInfo: document.querySelector('input[placeholder="Any additional information?"]').value // Newly added field
    };

    // Send the form data to the server
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Display server response
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
