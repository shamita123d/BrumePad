const WebSocket = require('ws');

let clients = [];

function setupWebSocket(server){
    const wss = new WebSocket.Server({ server });

    wss.on('connection', ws => {
        clients.push(ws);

        ws.on('message', message => {
            clients.forEach(client => {
                if(client !== ws && client.readyState === WebSocket.OPEN){
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
        });
    });
}

module.exports = { setupWebSocket };
