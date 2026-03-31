const express = require('express')
const morgan = require('morgan')
const { persons, addPerson, deletePerson } = require('./persons')
const info = require('./info')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)
  person ? response.json(person) : response.status(404).end()
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  response.send(info())
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find((person) => person.id === id)
  deletePerson(id)
  person ? response.status(204).end() : response.status(404).end()
})

app.post('/api/persons', (request, response) => {
  const { name, number} = request.body
  if (!name && !number) {
    return response.status(400).json({ error: 'Neither name nor number given' })
  }
  if (!name) {
    return response.status(400).json({ error: 'No name given'})
  }
  if (!number) {
    return response.status(400).json({ error: 'No number given' }) 
  }
  if (persons.some((person) => person.name === name)) {
    return response.status(409).json({ error: `${ name } already exists in phonebook`})
  }
  const person = addPerson(name, number)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})