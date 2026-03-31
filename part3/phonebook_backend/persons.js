let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const generateId = () => String(Math.floor(Math.random() * 10**6))

const addPerson = (name, number) => {
  const person = {
    "id": generateId(),
    "name": name,
    "number": number
  }
  persons.push(person)
  return person
}

const deletePerson = (id) => {
  const index = persons.findIndex((person) => person.id === id)
  persons.splice(index, 1)
}

module.exports = { persons, addPerson, deletePerson }