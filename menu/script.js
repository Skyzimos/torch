let Button = document.getElementById('button');
localStorage.setItem('open-data', 'hello')

Button.onclick = function() {
	sessionStorage.setItem('selection-menu', 't')
	window.location.href = '/torch/loading/'
}