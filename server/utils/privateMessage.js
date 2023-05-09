export function privateMessage(message, from, to, wss) {
  wss.clients.forEach((client) => {
    if (client.id === to || client.id === from) {
      client.send(JSON.stringify(message));
    }
  });
}
