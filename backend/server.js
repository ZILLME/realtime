require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { initWebSocket } = require('./utils/websocket');
const connectDB = require('./config/db');
const notesRoute = require('./routes/notes');

const app = express();
app.use(cors());
app.use(express.json());

// DB接続
connectDB();

// ルーティング
app.use('/api/notes', notesRoute);

// サーバーおよびWebSocket起動
const server = http.createServer(app);
initWebSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
