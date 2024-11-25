const API_URL = 'https://plaid-smooth-neon.glitch.me/api/qr-scans';

await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: localStorage.getItem('open-data', 'hello'),
    }),
  });