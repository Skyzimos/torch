let SeatInfo = sessionStorage.getItem('ticket_showtime_verification');

let Tickets = { ... localStorage };

for (var Index in Tickets) {
	if (Index.includes(SeatInfo)) {
		document.getElementById('show-time').innerHTML = 'Your show time is: ' + Index.split('.')[1];
	}
}

let Countdown = document.getElementById('countdown');

let CountdownTime = 5;

setInterval(() => {
	Countdown.innerHTML = CountdownTime

	if (CountdownTime == 0) {
		sessionStorage.removeItem('ticket_showtime_verification');
		sessionStorage.setItem('ticket_showtime_verification_complete', 't');
		window.location.href = '/torch/loading/';

		return;
	}

	CountdownTime -= 1
}, 1000);