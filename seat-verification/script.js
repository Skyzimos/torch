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

document.onkeydown = function(event) {
	if (event.key == 'Backspace' && document.activeElement == Input2 && Input2.value == '') {
		Input2.value = '';
		Input1.select();
	}
};

let Keystrokes = []

document.onkeydown = function(event) {
	if (event.key == 'Backspace' && document.activeElement == Input2 && Input2.value == '') {
		Input2.value = '';
		Input1.select();
	} else {
		Keystrokes.push(event.key);
		console.log(Keystrokes)

		if (Keystrokes.length >= 24) {
			Type = 2;
			sessionStorage.setItem('type', Type);
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
			Found = true;
			let Item_Value = Items[Item];

			if (sessionStorage.getItem('type') && parseFloat(sessionStorage.getItem('type')) == 2) {
				if (parseFloat(Item.split('.')[1].replace(':', '')) >= 530) {
					sessionStorage.setItem('ticket_verification', 'Ticket #' + Value1 + Value2 + '@' + Item_Value);

					window.location.href = '/torch/loading/';
				} else {
					Input1.select()
					alert('Your show time is already over. Sorry!');
				}
			} else {
				if (parseFloat(Item.split('.')[1].replace(':', '')) > 500) {
					Input1.select();
					alert('Your show time is at 5:30. Come back later!');
				} else {
					sessionStorage.setItem('ticket_verification', 'Ticket #' + Value1 + Value2 + '@' + Item_Value);

					window.location.href = '/torch/loading/';
				}
			}
		}
	}

	if (Found == false) {
		alert('Ticket number ' + Value1 + Value2 + ' is invalid. Please check your ticket and try again.');
		Input1.select();
		return;
	}
}