const WebSocket = require('ws');

let clients = [];

function setupWebSocket(server){
    const wss = new WebSocket.Server({ server });

    wss.on('connection', ws => {
        clients.push(ws);

        ws.on('message', message => {
            // Parse JSON message
            let data;
            try { data = JSON.parse(message); } catch { return; }

            // Broadcast to all clients except sender
            clients.forEach(client => {
                if(client !== ws && client.readyState === WebSocket.OPEN){
                    client.send(JSON.stringify(data));
                }
            });
        });

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
        });
    });
}

module.exports = { setupWebSocket };
