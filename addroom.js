// addroom.js

document.getElementById('addRoomForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form data
  const roomNumber = document.getElementById('roomNumber').value;
  const floor = document.getElementById('floor').value;
  const section = document.getElementById('section').value;
  const status = document.getElementById('status').value;
  const block = document.getElementById('block').value;

  const roomData = { roomNumber, floor, section, status, block };

  const addRoomButton = document.querySelector('.button'); // Get the button element
  const messageContainer = document.createElement('div'); // Create a container for the message
  const formContainer = addRoomButton.parentNode; // Get the parent container of the button

  // Clear any previous message when the button is clicked again
  const previousMessage = formContainer.querySelector('.message-container');
  if (previousMessage) {
    previousMessage.remove(); // Remove previous message if exists
  }

  addRoomButton.disabled = true; // Disable the button during the request
  addRoomButton.innerHTML = 'Submitting...'; // Change button text to indicate submission

  try {
    const response = await fetch('http://localhost:3000/rooms/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    });

    const result = await response.json();

    // Append the message container after the button
    messageContainer.classList.add('message-container');
    formContainer.appendChild(messageContainer);

    if (response.status === 201) {
      // On success, change button text and display green success message
      addRoomButton.innerHTML = 'Room Added Successfully';
      messageContainer.textContent = 'The room has been added successfully!';
      messageContainer.style.color = 'green'; // Green text for success

      // Wait for 3 seconds before resetting the form
      setTimeout(() => {
        addRoomButton.innerHTML = 'Add Room'; // Reset the button text
        addRoomButton.disabled = false; // Re-enable the button
        messageContainer.remove(); // Remove the success message
        document.getElementById('addRoomForm').reset(); // Reset the form fields
      }, 3000); // Reset after 3 seconds
    } else {
      // On error, re-enable the button and show red error message
      addRoomButton.disabled = false;
      addRoomButton.innerHTML = 'Add Room'; // Reset the button text
      messageContainer.textContent = result.message;
      messageContainer.style.color = 'red'; // Red text for error
    }
  } catch (error) {
    console.error('Error during room addition:', error);
    addRoomButton.disabled = false; // Re-enable the button
    addRoomButton.innerHTML = 'Add Room'; // Reset the button text
    messageContainer.textContent = 'Room addition failed. Please try again.';
    messageContainer.style.color = 'red'; // Red text for error
  }
});
