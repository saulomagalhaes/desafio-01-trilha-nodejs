const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksUsername(request, response, next) {
  const { username } = request.body;
  const user = users.find((user) => user.username === username);

  if (user){
    return response.status(400).json({ error: 'User already exists' });
  }

  return next();
}


function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  const user = users.find((user) => user.username === username);

  if (!user){
    return response.status(400).json({ error: 'User does not exists' });
  }

  request.user = user;

  return next();
}

app.post('/users',checksUsername, (request, response) => {
  const { name, username } = request.body;

  const id = uuidv4();

  users.push({
    id,
    name,
    username,
    todos: [],
  });

  response.status(201).json({
    id,
    name,
    username,
    todos: [],
  });
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request; // Recupera o user da requisição

  return response.json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
