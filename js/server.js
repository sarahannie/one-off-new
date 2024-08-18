document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
        gname: document.getElementById('gname').value,
        gmail: document.getElementById('gmail').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
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