document.getElementById('removeRoomForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Get form data
    const roomNumber = document.getElementById('roomNumber').value;
    const block = document.getElementById('block').value;
  
    const roomData = { roomNumber, block };
  
    const removeRoomButton = document.querySelector('.button'); // Get the button element
    const messageContainer = document.createElement('div'); // Create a container for the message
    const formContainer = removeRoomButton.parentNode; // Get the parent container of the button
  
    // Clear any previous message when the button is clicked again
    const previousMessage = formContainer.querySelector('.message-container');
    if (previousMessage) {
      previousMessage.remove(); // Remove previous message if exists
    }
  
    removeRoomButton.disabled = true; // Disable the button during the request
    removeRoomButton.innerHTML = 'Submitting...'; // Change button text to indicate submission
  
    try {
      const response = await fetch('http://localhost:3000/rooms/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });
  
      const result = await response.json();
  
      // Append the message container after the button
      messageContainer.classList.add('message-container');
      formContainer.appendChild(messageContainer);
  
      if (response.status === 200) {
        // On success, change button text and display green success message
        removeRoomButton.innerHTML = 'Room Removed Successfully';
        messageContainer.textContent = 'The room has been removed successfully!';
        messageContainer.style.color = 'white'; // Green text for success
  
        // Wait for 3 seconds before resetting the form
        setTimeout(() => {
          removeRoomButton.innerHTML = 'Remove Room'; // Reset the button text
          removeRoomButton.disabled = false; // Re-enable the button
          messageContainer.remove(); // Remove the success message
          document.getElementById('removeRoomForm').reset(); // Reset the form fields
        }, 3000); // Reset after 3 seconds
      } else {
        // On error, re-enable the button and show red error message
        removeRoomButton.disabled = false;
        removeRoomButton.innerHTML = 'Remove Room'; // Reset the button text
        messageContainer.textContent = result.message;
        messageContainer.style.color = 'red'; // Red text for error
      }
    } catch (error) {
      console.error('Error during room removal:', error);
      removeRoomButton.disabled = false; // Re-enable the button
      removeRoomButton.innerHTML = 'Remove Room'; // Reset the button text
      messageContainer.textContent = 'Room removal failed. Please try again.';
      messageContainer.style.color = 'red'; // Red text for error
    }
  });
  