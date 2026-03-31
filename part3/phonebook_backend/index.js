const express = require('express')
const persons = require('./persons')

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})