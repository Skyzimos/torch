document.getElementById('show-time').innerHTML = (sessionStorage.getItem('time') || '5:00').replace('.', ':').replace(/_.*$/, '') + ' Show | Seat Map'

let Elements = document.getElementsByClassName('seat');
const Items = { ...localStorage };
let Selected = [];

const socket = new WebSocket('https://plaid-smooth-neon.glitch.me');

socket.addEventListener('open', () => {
	console.log('Connected to WebSocket server');
	socket.send(JSON.stringify({ type: 'register', role: 'selection_menu' }))
});

// Retrieve the person's name (for example, using sessionStorage or a prompt)
let personName = prompt("Enter your name:");

let masterTickets = JSON.parse(localStorage.getItem('masterTickets')) || {}; // Get the masterTickets object or create an empty one if not found

// Initialize the person's data if it doesn't exist
if (!masterTickets[personName]) {
	masterTickets[personName] = {
		seats: [],
		ticketNumbers: []
	};
}

for (var Element of Elements) {
	for (var Item in Items) {
		if (Item.includes('ticket_')) {
			if (Items[Item] == Element.getAttribute('data-name') && Item.includes(sessionStorage.getItem('time').replace('.', ':').replace(/_.*$/, ''))) {
				Element.style.backgroundColor = '#CC0000'; // Red color for occupied seats
				Element.style.cursor = 'not-allowed';
			}
		}
	}

	// Handle seat selection
	Element.onclick = function (e) {
		let Elem = e.target;

		if (Elem.style.backgroundColor == 'rgb(83, 204, 0)') {
			Elem.style.backgroundColor = '#808080'; // Grey out if unselected
			const Index = Selected.indexOf(Elem.getAttribute('data-name'));
			if (Index > -1) {
				Selected.splice(Index, 1);
			}
		} else if (Elem.style.backgroundColor == 'rgb(204, 0, 0)') {
			return; // Prevent selection of unavailable seats
		} else {
			Elem.style.backgroundColor = '#53CC00'; // Green for selected seats
			Selected.push(Elem.getAttribute('data-name'));
		}
	};
}

document.getElementById('continue').onclick = function () {
	document.querySelector('.overlay').style.display = 'block';
	let NumberOfSeats = Selected.length;
	if (NumberOfSeats == 0) {
		alert('Please select one or more seats.');
		return;
	}

	// Assuming the ticket numbers are assigned sequentially or in some other way

	// Store additional session data if needed
	sessionStorage.setItem('processing', 't')

	socket.send(JSON.stringify({ type: 'send_ticket_info', data: { current_name: personName, current_amount: NumberOfSeats } }))

	socket.addEventListener('message', (event) => {
		// Make sure to access the data via event.data
		const data = JSON.parse(event.data);

		if (data.type === 'continue_to_loading') {
			let ticketNumbers = data.payload;

			// Update the masterTickets object for the person
			masterTickets[personName] = {
				seats: Selected,
				ticketNumbers: ticketNumbers
			};

			// Save the updated masterTickets object to localStorage
			localStorage.setItem('masterTickets', JSON.stringify(masterTickets));
			// Redirect to the next page
			window.location.href = '/torch/loading/';

		}
	});
};
