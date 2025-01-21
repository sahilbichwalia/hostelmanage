document.querySelector('.login').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Get username/email and password
    const usernameOrEmail = document.querySelector('.login__input[type="text"]').value;
    const password = document.querySelector('.login__input[type="password"]').value;

    // Send data to the backend for verification
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usernameOrEmail, password }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login Successful!'); // Show success message
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        } else {
            alert(result.message || 'Login Failed. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
