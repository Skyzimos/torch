let Button = document.getElementById('button');

Button.onclick = function() {
	sessionStorage.setItem('selection-menu', 't')
	window.location.href = '/loading/'
}