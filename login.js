const backendUrl = 'https://hostelmanage-brdunnpfu-sahilbichwalias-projects.vercel.app:3000';  // Directly set backend URL

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Username:', username); // Check if the username and password are being captured
    console.log('Password:', password);

    // Reset any previous error messages
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.remove(); // Remove the previous error message, if any
    }

    // Sending the POST request using fetch
    fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send login data to backend
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data); // Log the response from the backend

        if (data.message === 'Login successful') {
            console.log('Department:', data.department); // Log department to check if it's correct

            // Check if the department is 'admin' (trimmed and case-insensitive comparison)
            if (data.department === 'Admin') {
                // Redirect to admin page if the department is admin
                window.location.href = 'admin.html'; 
            } else {
                // Redirect to a different page if the department is not admin
                window.location.href = 'bh1.html'; 
            }
        } else {
            // If login fails, display the error message below the form
            const errorDiv = document.createElement('div');
            errorDiv.id = 'error-message';
            errorDiv.style.color = 'red';  // Style the error message
            errorDiv.style.marginTop = '10px';
            errorDiv.innerHTML = data.message || 'Login failed. Please check your credentials.'; // Display the error message from the backend or a default message
            document.getElementById('loginForm').appendChild(errorDiv); // Append error message below the form
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '10px';
        errorDiv.innerHTML = 'An error occurred. Please try again.'; // Display a generic error message
        document.getElementById('loginForm').appendChild(errorDiv);
    });
});


