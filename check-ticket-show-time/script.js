const socket = new WebSocket('https://plaid-smooth-neon.glitch.me');

socket.addEventListener('open', () => {
	console.log('Connected to WebSocket server');
	socket.send(JSON.stringify({ type: 'register', role: 'ticket_host' }))

	socket.addEventListener('message', (event) => {
		const data = JSON.parse(event.data);

		let masterTickets = JSON.parse(localStorage.getItem('masterTickets'));

		function getPersonAndSeats(ticketNumber) {
			// Iterate through the masterTickets object
			for (let personName in masterTickets) {
				let ticketNumbers = masterTickets[personName].ticketNumbers;

				// Check if the ticket number exists in the person's ticketNumbers array
				if (ticketNumbers.includes(ticketNumber)) {
					// Return the person's name and their seat numbers
					return {
						name: personName,
						seats: masterTickets[personName].seats
					};
				}
			}

			return null;
		}

		let ticketNumber = data.payload;
		let result = getPersonAndSeats(ticketNumber);

		if (result) {
			sessionStorage.setItem('ticketNUMBERHOST', ticketNumber);
			location.href = '/torch/check-ticket-show-time/ticket-time/'
		} else {
			console.log('Ticket number not found.');
		}
	});
});

/*
let Input1 = document.getElementById('otp-input1');
let Input2 = document.getElementById('otp-input2');

let Form = document.getElementById('otp-Form');

let Type = 1;

Input1.select();

//	<img src='https://api.dub.co/qr?url=https://skyzimos.github.io/torch/get-ticket-data/&size=150'>

Input1.oninput = function() {
	if (!Input1.value.match(/\d+/g)) return Input1.value = '';
	Input2.select();
}

Input2.oninput = function() {
	if (!Input2.value.match(/\d+/g)) return Input2.value = '';
}

window.onkeydown = function(event) {
	if (event.key == 'Backspace' && document.activeElement == Input2 && Input2.value == '') {
		Input2.value = '';
		Input1.select();
	} else if (event.key == 'Escape') {
		sessionStorage.clear();
		window.location.href = '/torch/loading/';
	}
};

let Keystrokes = []

document.onkeydown = function(event) {
	if (event.key == 'Backspace' && document.activeElement == Input2 && Input2.value == '') {
		Input2.value = '';
		Input1.select();
	} else {
		Keystrokes.push(event.key);

		if (Keystrokes == ['Backspace', 'Enter', 'Backspace', 'Escape', '1', '4', '6', '4']) {
			Type = 2;
		}
	}
};

Form.onsubmit = function(e) {
	e.preventDefault();

	let [ Value1, Value2 ] = [ Input1.value, Input2.value ];
	Input1.value = '';
	Input2.value = '';

	let Items = { ... localStorage };
	let Found = false

	for (var Item in Items) {
		if (Item.includes('ticket_' + Value1 + Value2)) {
			let Item_Value = Items[Item];
			Found = true
			sessionStorage.setItem('ticket_showtime_verification', 'ticket_' + Value1 + Value2);

			window.location.href = '/torch/loading/';

			return false;
		}
	}

	if (Found == false) {
		alert('Ticket number ' + Value1 + Value2 + ' is invalid. Please check your ticket and try again.');
		Input1.select();
		return;
	}
}

*/