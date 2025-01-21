
// let rooms = [];
// let filteredRooms = [];
// let lastSelectedBlock = 'BH1';  // Store the last selected block (default is 'BH1')

// // Fetch all rooms from the server when the page loads
// window.onload = () => {
//     fetchRooms();
//     generateBlockNavbar();  // Populate block navbar on page load
// };

// // Function to fetch rooms from the server
// function fetchRooms() {
//     fetch('http://localhost:3000/rooms')
//         .then(response => response.json())
//         .then(roomsData => {
//             rooms = roomsData;
//             filteredRooms = rooms;
//             displayRooms(filteredRooms);
//             filterRoomsByBlock(lastSelectedBlock);  // Apply the last selected block filter
//         })
//         .catch(error => {
//             console.error('Error fetching rooms:', error);
//             alert('Failed to load rooms. Try again later.');
//         });
// }

// // Function to display rooms on the page
// function displayRooms(roomsToDisplay) {
//     const roomList = document.getElementById('room-list');
//     roomList.innerHTML = '';  // Clear previous room list

//     roomsToDisplay.forEach(room => {
//         const roomDiv = document.createElement('div');
//         roomDiv.classList.add('room');

//         const roomId = document.createElement('div');
//         roomId.textContent = `Room: ${room.room_number}`;

//         const floor = document.createElement('div');
//         floor.textContent = `Floor: ${room.floor}`;

//         const section = document.createElement('div');
//         section.textContent = `Section: ${room.section}`;

//         const status = document.createElement('div');
//         status.textContent = room.status ? 'Occupied' : 'Available';
//         status.classList.add(room.status ? 'occupied' : 'available');

//         const block = document.createElement('div');
//         block.textContent = `Block: ${room.block}`;

//         const button = document.createElement('button');
//         button.textContent = room.status ? 'Mark as Available' : 'Mark as Occupied';
//         button.classList.add(room.status ? 'occupied' : 'available');
//         button.onclick = () => updateRoomStatus(room.id, room.status, status, button);

//         roomDiv.appendChild(roomId);
//         roomDiv.appendChild(floor);
//         roomDiv.appendChild(section);
//         roomDiv.appendChild(status);
//         roomDiv.appendChild(block);
//         roomDiv.appendChild(button);

//         roomList.appendChild(roomDiv);
//     });
// }

// // Function to generate block navbar dynamically in the sidebar
// function generateBlockNavbar() {
//     fetch('http://localhost:3000/block-counts')
//         .then(response => response.json())
//         .then(blockCounts => {
//             const navbar = document.getElementById('block-navbar');
//             navbar.innerHTML = '';  // Clear existing blocks (if any)

//             // Add blocks to the sidebar dynamically
//             blockCounts.forEach(block => {
//                 const button = document.createElement('button');
//                 button.textContent = `${block.block} - Occupied: ${block.occupied_count}, Unoccupied: ${block.unoccupied_count}`;
//                 button.onclick = () => filterRoomsByBlock(block.block);
//                 navbar.appendChild(button);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching block counts:', error);
//             alert('Failed to load block counts.');
//         });
// }

// // Function to filter rooms by block
// function filterRoomsByBlock(block) {
//     lastSelectedBlock = block;  // Store the last selected block
//     filteredRooms = rooms.filter(room => room.block === block);
//     displayRooms(filteredRooms);
// }

// // Function to update room status
// function updateRoomStatus(roomId, currentStatus, statusElement, buttonElement) {
//     const newStatus = !currentStatus;

//     fetch('http://localhost:3000/rooms/update', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id: roomId, status: newStatus })
//     })
//         .then(response => response.json())
//         .then(updatedData => {
//             if (updatedData.message === 'Room status updated successfully.') {
//                 // Update the status in the filteredRooms array
//                 const roomIndex = filteredRooms.findIndex(room => room.id === roomId);
//                 if (roomIndex !== -1) {
//                     filteredRooms[roomIndex].status = newStatus;  // Update status in the array
//                 }

//                 // Update the status and button text in the DOM
//                 statusElement.textContent = newStatus ? 'Occupied' : 'Available';
//                 statusElement.classList.toggle('occupied', newStatus);
//                 statusElement.classList.toggle('available', !newStatus);
//                 buttonElement.textContent = newStatus ? 'Mark as Available' : 'Mark as Occupied';

//                 // Re-render only the updated room
//                 displayRooms(filteredRooms);
//             } else {
//                 alert('Room not found.');
//             }
//         })
//         .catch(error => {
//             console.error('Error updating room status:', error);
//             alert('Failed to update room status.');
//         });
// }



// Assuming you don't have a build tool like Webpack, just use the BACKEND_URL directly
const backendUrl ='http://localhost:3000';  // You can replace this with process.env.BACKEND_URL if using Webpack or other build tools

let rooms = [];
let filteredRooms = [];
let lastSelectedBlock = 'BH1';  // Store the last selected block (default is 'BH1')

// Fetch all rooms from the server when the page loads
window.onload = () => {
    fetchRooms();
    generateBlockNavbar();  // Populate block navbar on page load
};

// Function to fetch rooms from the server
function fetchRooms() {
    fetch(`${backendUrl}/rooms`)
        .then(response => response.json())
        .then(roomsData => {
            rooms = roomsData;
            filteredRooms = rooms;
            displayRooms(filteredRooms);
            filterRoomsByBlock(lastSelectedBlock);  // Apply the last selected block filter
        })
        .catch(error => {
            console.error('Error fetching rooms:', error);
            alert('Failed to load rooms. Try again later.');
        });
}

// Function to display rooms on the page
function displayRooms(roomsToDisplay) {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = '';  // Clear previous room list

    roomsToDisplay.forEach(room => {
        const roomDiv = document.createElement('div');
        roomDiv.classList.add('room');

        const roomId = document.createElement('div');
        roomId.textContent = `Room: ${room.room_number}`;

        const floor = document.createElement('div');
        floor.textContent = `Floor: ${room.floor}`;

        const section = document.createElement('div');
        section.textContent = `Section: ${room.section}`;

        const status = document.createElement('div');
        status.textContent = room.status ? 'Occupied' : 'Available';
        status.classList.add(room.status ? 'occupied' : 'available');

        const block = document.createElement('div');
        block.textContent = `Block: ${room.block}`;

        const button = document.createElement('button');
        button.textContent = room.status ? 'Mark as Available' : 'Mark as Occupied';
        button.classList.add(room.status ? 'occupied' : 'available');
        button.onclick = () => updateRoomStatus(room.id, room.status, status, button);

        roomDiv.appendChild(roomId);
        roomDiv.appendChild(floor);
        roomDiv.appendChild(section);
        roomDiv.appendChild(status);
        roomDiv.appendChild(block);
        roomDiv.appendChild(button);

        roomList.appendChild(roomDiv);
    });
}

// Function to generate block navbar dynamically in the sidebar
function generateBlockNavbar() {
    fetch(`${backendUrl}/block-counts`)
        .then(response => response.json())
        .then(blockCounts => {
            const navbar = document.getElementById('block-navbar');
            navbar.innerHTML = '';  // Clear existing blocks (if any)

            // Add blocks to the sidebar dynamically
            blockCounts.forEach(block => {
                const button = document.createElement('button');
                button.textContent = `${block.block} - Occupied: ${block.occupied_count}, Unoccupied: ${block.unoccupied_count}`;
                button.onclick = () => filterRoomsByBlock(block.block);
                navbar.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching block counts:', error);
            alert('Failed to load block counts.');
        });
}

// Function to filter rooms by block
function filterRoomsByBlock(block) {
    lastSelectedBlock = block;  // Store the last selected block
    filteredRooms = rooms.filter(room => room.block === block);
    displayRooms(filteredRooms);
}

// Function to update room status
function updateRoomStatus(roomId, currentStatus, statusElement, buttonElement) {
    const newStatus = !currentStatus;

    fetch(`${backendUrl}/rooms/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: roomId, status: newStatus })
    })
        .then(response => response.json())
        .then(updatedData => {
            if (updatedData.message === 'Room status updated successfully.') {
                // Update the status in the filteredRooms array
                const roomIndex = filteredRooms.findIndex(room => room.id === roomId);
                if (roomIndex !== -1) {
                    filteredRooms[roomIndex].status = newStatus;  // Update status in the array
                }

                // Update the status and button text in the DOM
                statusElement.textContent = newStatus ? 'Occupied' : 'Available';
                statusElement.classList.toggle('occupied', newStatus);
                statusElement.classList.toggle('available', !newStatus);
                buttonElement.textContent = newStatus ? 'Mark as Available' : 'Mark as Occupied';

                // Re-render only the updated room
                displayRooms(filteredRooms);
            } else {
                alert('Room not found.');
            }
        })
        .catch(error => {
            console.error('Error updating room status:', error);
            alert('Failed to update room status.');
        });
}






































