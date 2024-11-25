document.getElementById('show-time').innerHTML = sessionStorage.getItem('time').replace('.', ':').replace(/_.*$/, '') + ' Show | Seat Map'

let Elements = document.getElementsByClassName('seat');
const Items = { ...localStorage };
let Selected = []

for (var Element of Elements) {	
	for (var Item in Items) {
		if (Item.includes('ticket_')) {
			if (Items[Item] == Element.getAttribute('data-name')  && Item.includes(sessionStorage.getItem('time').replace('.', ':').replace(/_.*$/, ''))) {
				Element.style.backgroundColor = '#CC0000';
				Element.style.cursor = 'not-allowed';
			}
		}
	}

	Element.onclick = function(e) {
		let Elem = e.target;
		console.log(Elem.style.backgroundColor)

		if (Elem.style.backgroundColor == 'rgb(83, 204, 0)') {
			Elem.style.backgroundColor = '#808080';
			
			const Index = Selected.indexOf(Elem.getAttribute('data-name'));
			if (Index > -1) {
				Selected.splice(Index, 1);
			}

			console.log(Selected)
		} else if (Elem.style.backgroundColor == 'rgb(204, 0, 0)') {
			return;
		} else {
			Elem.style.backgroundColor = '#53CC00';
			Selected.push(Elem.getAttribute('data-name'));
			console.log(Selected)
		}
	}
}

document.getElementById('continue').onclick = function() {
	let NumberOfSeats = Selected.length
	if (NumberOfSeats == null || NumberOfSeats == 0) {
		alert('Please select one or more seats.')
		return;
	}
	
	console.log(NumberOfSeats)
	sessionStorage.setItem('number_of_seats', NumberOfSeats);
	sessionStorage.setItem('seats', JSON.stringify(Selected));
	sessionStorage.setItem('finalize', 't');
	window.location.href = '/loading/'
}