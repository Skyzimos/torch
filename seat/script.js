let SeatInfo = sessionStorage.getItem('ticket_verification');

let Split = SeatInfo.split('@');

document.getElementById('show-time').innerHTML = Split[0];

let Elements = document.getElementsByClassName('seat');
const Items = { ...localStorage };
let Selected = []

for (var Element of Elements) {	
	if (Element.getAttribute('data-name') == Split[1]) {
		Element.style.backgroundColor = '#956afa';
		break;
	}
}

let Countdown = document.getElementById('countdown');

let CountdownTime = 5;

setInterval(() => {
	Countdown.innerHTML = CountdownTime

	if (CountdownTime == 0) {
		sessionStorage.removeItem('ticket_verification');
		sessionStorage.setItem('ticket_verification_complete', 't');
		window.location.href = '/loading/';
		
		return;
	}
	
	CountdownTime -= 1
}, 1000);