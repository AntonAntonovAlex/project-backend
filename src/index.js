require('dotenv').config();
const cors = require('cors');
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const commentService = require('./services/commentService');
const userRoutes = require('./routes/userRoutes');
const templateRoutes = require('./routes/templatesRoutes');
const topicRoutes = require('./routes/topicRoutes');
const formRoutes = require('./routes/formRoutes');
const commentRoutes = require('./routes/commentsRoutes');
const likeRoutes = require('./routes/likesRoutes');
const { sequelize } = require('./models');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/', userRoutes);
app.use('/', templateRoutes);
app.use('/', topicRoutes);
app.use('/', formRoutes);
app.use('/', commentRoutes);
app.use('/', likeRoutes);

const server = http.createServer(app);

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.on('message', (message) => {
    console.log('Received WebSocket message:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

server.on('upgrade', (request, socket, head) => {
  if (request.url === '/ws/comments') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

commentService.onCommentAdded((comment) => {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ type: 'new_comment', comment }));
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});
