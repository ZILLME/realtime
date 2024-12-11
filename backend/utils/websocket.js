const WebSocket = require('ws');
const Note = require('../models/Note');

let wss = null;

function initWebSocket(server) {
  wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      const data = JSON.parse(message);
      if (data.type === 'UPDATE_NOTE') {
        const { content } = data;
        let note = await Note.findOne();
        if (!note) note = new Note();
        note.content = content;
        note.history.push({ content });
        await note.save();

        broadcast(JSON.stringify({ type: 'NOTE_UPDATED', content }));
      }
    });
  });
}

function broadcast(msg) {
  if (!wss) return;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

module.exports = { initWebSocket };
