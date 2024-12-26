require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const templateRoutes = require('./routes/templatesRoutes');
const topicRoutes = require('./routes/topicRoutes');
const formRoutes = require('./routes/formRoutes');
const commentRoutes = require('./routes/commentsRoutes');
const { sequelize } = require('./models');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});
