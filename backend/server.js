const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established sucessfully');
})

const usersRoute = require('./routes/users');
const projectsRoute = require('./routes/projects');

app.use('/users', usersRoute);
app.use('/projects', projectsRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});