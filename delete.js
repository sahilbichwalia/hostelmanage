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
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const messageContainer = document.createElement('div'); // Create a container for the message
    messageContainer.style.marginTop = '20px'; // Style the container
    form.appendChild(messageContainer); // Append it to the form
  
    form.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Clear any previous messages
      messageContainer.innerHTML = '';
  
      // Get form data
      const email = document.getElementById('email').value;
      const emp_id = document.getElementById('emp_id').value;
      const department = document.getElementById('department').value;
  
      // Validation check
      if (!email || !emp_id || !department) {
        messageContainer.innerHTML = '<p style="color: red;">Please fill in all fields</p>';
        return;
      }
  
      // Prepare the data for sending in the request body
      const userData = {
        email: email,
        emp_id: emp_id,
        department: department
      };
  
      try {
        // Send a POST request to the server to delete the user
        const response = await fetch('http://localhost:3000/delete-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        // Parse the response
        const result = await response.json();
  
        if (response.ok) {
          // Handle success
          messageContainer.innerHTML = '<p style="color: green;">User deleted successfully</p>';
          form.reset();  // Optionally reset the form
        } else {
          // Handle failure (e.g., user not found or server error)
          messageContainer.innerHTML = `<p style="color: red;">${result.message || 'Failed to delete user'}</p>`;
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        messageContainer.innerHTML = '<p style="color: red;">Error deleting user. Please try again later.</p>';
      }
    });
  });
  