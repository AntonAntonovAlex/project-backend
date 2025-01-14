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



const axios = require('axios');

app.post('/api/salesforce', async (req, res) => {
  try {
    const { accountName, phone, firstName, lastName, email } = req.body;
    const tokenResponse = await axios.post(
      process.env.SALESFORCE_ROUTE,
      new URLSearchParams({
        grant_type: 'password',
        client_id: process.env.SALESFORCE_CLIENT_ID,
        client_secret: process.env.SALESFORCE_CLIENT_SECRET,
        username: process.env.SALESFORCE_USERNAME,
        password: process.env.SALESFORCE_PASSWORD,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token: accessToken, instance_url: instanceUrl } = tokenResponse.data;
    const accountResponse = await axios.post(
      `${instanceUrl}/services/data/v57.0/sobjects/Account/`,
      {
        Name: accountName,
        Phone: phone,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const accountId = accountResponse.data.id;

    await axios.post(
      `${instanceUrl}/services/data/v57.0/sobjects/Contact/`,
      {
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Phone: phone,
        AccountId: accountId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Account and Contact created successfully!' });
  } catch (error) {
    console.error('Error interacting with Salesforce:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to interact with Salesforce' });
  }
});





const PORT = process.env.PORT || 3000;
server.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});
