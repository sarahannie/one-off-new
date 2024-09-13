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
  y = x[currentTab].getElementsByClassName("inputs");
  
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
    whereHeard: document.querySelector('select[name="whereHeard"]').value,
    adequateInsurance: document.querySelector('select[name="adequateInsurance"]').value,
    retirementPlan: document.querySelector('select[name="retirementPlan"]').value,
    reasonForInsurance: document.querySelector('input[name="reasonForInsurance"]').value,
    productEducation: document.querySelector('select[name="productEducation"]').value,
    retirementChoice: document.querySelector('select[name="retirementChoice"]').value,
    taxPreference: document.querySelector('select[name="taxPreference"]').value,
    maritalStatus: document.querySelector('select[name="maritalStatus"]').value,
    employmentStatus: document.querySelector('select[name="employmentStatus"]').value,
    additionalInfo: document.querySelector('input[name="additionalInfo"]').value
  };

  // Send the form data to the server
  fetch('https://one-off-elite-server.vercel.app/send-email', {
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
      whereHeard: document.getElementById('whereHeard').value, // Corrected selector
      adequateInsurance: document.getElementById('adequateInsurance').value, // Corrected selector
      retirementPlan: document.getElementById('retirementPlan').value, // Corrected selector
      reasonForInsurance: document.getElementById('reasonForInsurance').value, // Corrected selector
      productEducation: document.getElementById('productEducation').value, // Corrected selector
      retirementChoice: document.getElementById('retirementChoice').value, // Corrected selector
      taxPreference: document.getElementById('taxPreference').value, // Corrected selector
      typeofinsurances: document.getElementById('typeofinsurances').value, // Corrected selector
      employmentStatus: document.getElementById('employmentStatus').value, // Corrected selector
      additionalInfo: document.getElementById('additionalInfo').value // Corrected selector
  };

  // Send the form data to the server
  fetch('https://one-off-elite-server.vercel.app/send-email', {
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

  document.getElementById('book-meeting-button').style.display = 'block';
});