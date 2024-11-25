let Input1 = document.getElementById('otp-input1');
let Input2 = document.getElementById('otp-input2');

let Form = document.getElementById('otp-Form');

let Type = 1;

Input1.select();

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