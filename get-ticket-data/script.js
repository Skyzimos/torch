const socket = new WebSocket('https://plaid-smooth-neon.glitch.me');

socket.addEventListener('open', function() {
    socket.send(JSON.stringify({ type: 'logQR', payload: 'hello' }));
})