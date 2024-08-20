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
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab += n;

  // Check if we are at the last tab
  if (currentTab >= x.length) {
    // Hide navigation buttons
    document.getElementById("prevBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    
    // Submit the form
    submitForm();
    return false;
  }
  
  showTab(currentTab);
}

function validateForm() {
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  
  if (!valid) {
    alert("Please input your information to continue.");
  } else {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }

  return valid; 
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

function submitForm() {
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value,
    hearAbout: document.querySelector('input[placeholder="Where did you hear about us?"]').value,
    adequateInsurance: document.querySelector('input[placeholder="Do you have adequate life insurance?"]').value,
    retirementPlan: document.querySelector('input[placeholder="Do you have a retirement plan?"]').value,
    reasonForInsurance: document.querySelector('input[placeholder="What is your reason to get life insurance?"]').value,
    education: document.querySelector('input[placeholder="Education about the product?"]').value,
    retirementChoice: document.querySelector('input[placeholder="Would you want retirement by default or designer?"]').value,
    taxChoice: document.querySelector('input[placeholder="Would you want tax-free or taxable retirement?"]').value,
    maritalStatus: document.querySelector('input[placeholder="Are you married or single?"]').value,
    employmentStatus: document.querySelector('input[placeholder="Are you employed or unemployed?"]').value,
    additionalInfo: document.querySelector('input[placeholder="Any additional information?"]').value,
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
    // Display success message
    document.getElementById("messages").innerText = data; // Assuming you have a message element
  })
  .catch(error => {
    console.error('Error:', error);
    // Display error message
    document.getElementById("messages").innerText = 'There was an error sending your request. Please try again later.';
  });
}
