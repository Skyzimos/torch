const socket = new WebSocket('https://plaid-smooth-neon.glitch.me');

socket.send(JSON.stringify({ type: 'logQR', payload: 'hello' }));