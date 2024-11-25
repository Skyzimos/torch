let SSItems = { ... sessionStorage };
console.log(Object.keys(SSItems).length)
if (SSItems == {} || SSItems.length == 0 || Object.keys(SSItems).length == 0) {
	window.location.href = '/torch/menu/'
}

let Input1 = document.getElementById('otp-input1');
let Input2 = document.getElementById('otp-input2');

let Form = document.getElementById('otp-Form');

document.querySelector('h1').innerHTML = sessionStorage.getItem('number_of_seats') + ' Total'

Input1.oninput = function() {
	if (!Input1.value.match(/\d+/g)) return Input1.value = '';
	Input2.select();
}

Input2.oninput = function() {
	if (!Input2.value.match(/\d+/g)) return Input2.value = '';
}

document.onkeydown = function(event) {
	if (event.key == 'Backspace' && document.activeElement == Input2 && Input2.value == '') {
		Input2.value = '';
		Input1.select();
	}
};

let Example_Element = document.getElementById('example');

let Number = 1;

let Seats = JSON.parse(sessionStorage.getItem('seats'));

function compareSeats(seat1, seat2) {
	const number1 = parseInt(seat1.match(/\d+/)[0]);
	const number2 = parseInt(seat2.match(/\d+/)[0]);
	return number1 - number2;
}

const sortedSeats = Seats.sort(compareSeats);

for (var Index of sortedSeats) {
	let Clone = Example_Element.cloneNode(true)
	Clone.id = Index;
	Clone.getElementsByClassName('header')[0].innerHTML = Index;
	Clone.style.display = 'block';
	Clone.id = Number;
	Number ++;
	document.getElementById('scrollable-frame').appendChild(Clone);
}



let Submissions = 0;
let Elements = document.getElementById('scrollable-frame').getElementsByClassName('example');

for (var Element of Elements) {	
	Element.onclick = function(e) {
		let Elem = e.target;
		let end = false;
		
		var childElements = Elem.children;
		var desiredClassName = 'ticket-number';

		for (var i = 0; i < childElements.length; i++) {
			var currentElement = childElements[i];

			if (currentElement.classList.contains(desiredClassName)) {
				if (currentElement.innerHTML !== 'Click Me!') return end = true;
			}
		}

		if (end) return;
		
		Form.style.display = 'flex';
		document.getElementById('background').style.display = 'flex';
		Input1.select();

		Form.onsubmit = function (event) {			
			event.preventDefault();

			let [ Value1, Value2 ] = [ Input1.value, Input2.value ];
			Input1.value = '';
			Input2.value = '';

			let Items = { ... localStorage };

			for (var Item in Items) {
				console.log(Item)
				
				if (Item.replace(/\..*$/, '').includes('ticket_' + Value1 + Value2)) {
					alert('Ticket Already Submitted');
					Input1.select()
					return;
				}
			}
			
			if (localStorage.getItem(('ticket_' + Value1 + Value2))) {
				alert('Ticket Already Submitted');
				Input1.select()
				return;
			}

			var childElements = Elem.children;
			var desiredClassName = 'ticket-number';

			for (var i = 0; i < childElements.length; i++) {
				var currentElement = childElements[i];

				if (currentElement.classList.contains(desiredClassName)) {
					currentElement.innerHTML = 'Ticket #' + Value1 + Value2;
				} else if (currentElement.classList.contains('header')) {
					localStorage.setItem('ticket_' + Value1 + Value2 + '.' + sessionStorage.getItem('time').replace('.', ':').replace(/_.*$/, ''), currentElement.innerHTML);
					
					Submissions ++;
				}
			}

			Form.style.display = 'none';
			document.getElementById('background').style.display = 'none';
		}
	}
}

document.getElementById('finalize').onclick = function() {
	console.log(Submissions, Elements.length)
	if (Submissions == (Elements.length - 1)) {
		sessionStorage.clear()
		sessionStorage.setItem('processing', 't')
		window.location.href = '/torch/loading';
	} else {
		alert(`You haven't assigned all your seats to a ticket.\n\nFollow these steps: For each seat, please select it on the side, and a pop up will appear. Then, grab a ticket, and input the last 2 digits into the popup.`);
	}
}

setTimeout(() => {
	document.getElementById('got-it').style.backgroundColor = '#956afa';
	document.getElementById('got-it').style.color = 'white';
	document.getElementById('got-it').disabled = false;
}, 5000);

document.getElementById('got-it').onclick = function () {
	document.getElementById('form').style.display = 'none';
	document.getElementById('background').style.display = 'none';
}