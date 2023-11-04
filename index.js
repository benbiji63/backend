const express = require('express');
const morgan = require("morgan");
const morganBody = require('morgan-body');

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('combined'));
morganBody(app);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.post('/api/persons', (req, res) => {
  const newId = Math.floor(Math.random() * 1000000);
  const body = req.body;
  const names = persons.map(person => person.name);
  console.log(names);
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Request incomplete',
    });
  } else if (names.includes(body.name)) {
    return res.status(400).json({
      error: 'Contact already exist',
    });
  }

  const person = {
    id: newId,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  res.json(person);

  // notes=notes.concat(...)
});

app.get('/', (req, res) => res.send('<h1>Hello World!<h1>'));
app.get('/api/persons', (req, res) => res.json(persons));
app.get('/info', (req, res) => {
  const date = new Date();
  res.send(`
  <p>Phonebook has info of ${persons.length} 
  <p>${date.toString()}</p>
  `);
});
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);
  console.log(person);
  res.json(person);
});

// app.delete('api/persons/:id', (req, res) => {
//   const id = Number(req.params.id);
//   // notes = notes.filter(note => note.id !== id);
//   // res.json(notes);
//   // res.status(204).end;
// });

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  res.json(persons);
  res.status(204).end;
});
app.listen(port);
