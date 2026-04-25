const WebSocket = require('ws');

const wss = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });

const clients = new Map();

wss.on('connection', (clientWs) => {
  console.log('Client connected');
  
  clientWs.on('message', (data) => {
    try {
      const msg = JSON.parse(data);
      
      if (msg.type === 'register') {
        clients.set(msg.userId, clientWs);
        clientWs.userId = msg.userId;
        console.log(`User registered: ${msg.userId}`);
        clientWs.send(JSON.stringify({ type: 'registered' }));
      }
      
      else if (msg.type === 'send') {
        const recipient = clients.get(msg.to);
        if (recipient && recipient.readyState === WebSocket.OPEN) {
          recipient.send(JSON.stringify({
            type: 'message',
            from: msg.from,
            subject: msg.subject,
            body: msg.body,
            timestamp: Date.now()
          }));
          clientWs.send(JSON.stringify({ type: 'delivered' }));
        } else {
          clientWs.send(JSON.stringify({ type: 'error', message: 'Recipient offline' }));
        }
      }
      
      else if (msg.type === 'poll') {
        clientWs.send(JSON.stringify({ type: 'poll_ack' }));
      }
    } catch (e) {
      console.error('Message error:', e);
    }
  });

  clientWs.on('close', () => {
    if (clientWs.userId) {
      clients.delete(clientWs.userId);
      console.log(`User disconnected: ${clientWs.userId}`);
    }
  });
});

console.log('WebSocket relay running on ws://0.0.0.0:8080');