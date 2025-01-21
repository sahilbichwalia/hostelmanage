// JS for Sidebar Toggle
const sidebar = document.getElementById('msb');
const hamburger = document.getElementById('hamburger');

// Toggle Sidebar and Body Color
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  if (sidebar.classList.contains('active')) {
    hamburger.innerHTML = '<i class="fa fa-bars"></i>';
    document.body.style.backgroundColor = '#fff';
  } else {
    hamburger.innerHTML = '<i class="fa fa-times"></i>';
    document.body.style.backgroundColor = '#34495e';
  }
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const emp_id = document.getElementById('emp_id').value;
  const department = document.getElementById('department').value;

  const userData = { email, password, first_name, last_name, emp_id, department };

  const registerButton = document.querySelector('.register-btn'); // Get the button element
  const messageContainer = document.createElement('div'); // Create a container for the message
  const formContainer = registerButton.parentNode; // Get the parent container of the button

  // Clear any previous message when the button is clicked again
  const previousMessage = formContainer.querySelector('.message-container');
  if (previousMessage) {
    previousMessage.remove(); // Remove previous message if exists
  }

  registerButton.disabled = true; // Disable the button during the request
  registerButton.innerHTML = 'Submitting...'; // Change button text to indicate submission

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    // Append the message container after the button
    messageContainer.classList.add('message-container');
    formContainer.appendChild(messageContainer);

    if (response.status === 200) {
      // On success, change button text and display green success message
      registerButton.innerHTML = 'Registration Successful';
      messageContainer.textContent = 'Your account has been created successfully!';
      messageContainer.style.color = 'green'; // Green text for success

      // Wait for 3 seconds before resetting the form
      setTimeout(() => {
        registerButton.innerHTML = 'Register'; // Reset the button text
        registerButton.disabled = false; // Re-enable the button
        messageContainer.remove(); // Remove the success message
        document.getElementById('register-form').reset(); // Reset the form fields
      }, 3000); // Reset after 3 seconds
    } else {
      // On error, re-enable the button and show red error message
      registerButton.disabled = false;
      registerButton.innerHTML = 'Register'; // Reset the button text
      messageContainer.textContent = result.message;
      messageContainer.style.color = 'red'; // Red text for error
    }
  } catch (error) {
    console.error('Error during registration:', error);
    registerButton.disabled = false; // Re-enable the button
    registerButton.innerHTML = 'Register'; // Reset the button text
    messageContainer.textContent = 'Registration failed. Please try again.';
    messageContainer.style.color = 'red'; // Red text for error
  }
});

  
