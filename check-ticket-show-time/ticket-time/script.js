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

document.getElementById('continue').addEventListener('click', () => {
	sessionStorage.setItem('check_ticket_show_time', 't');
	location.href = '/torch/loading/';
})

let ticketNumber = sessionStorage.getItem('ticketNUMBERHOST');
let result = getPersonAndSeats(ticketNumber);

if (result) {
	document.getElementById('show-time').innerHTML = 'Welcome, ' + result.name;
	result.seats.forEach(element => {
		let seat = element.replace('Seat ', '');
		document.querySelector(`.${seat}`).style.backgroundColor = 'rgb(83, 204, 0)';
	});
} else {
	console.log('Ticket number not found.');
}