import { useState } from 'react'

const Numbers = ({ name }) => <div>{ name }</div>

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', important: true}
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${ newName } already added to phonebook`)
      setNewName('')
      return
    }
    const personObject = {
      id: persons.length +1,
      name: newName,
      important: Math.random() > 0.5
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ addName }>
        <div>
          name: <input value={ newName } onChange={ handleNameChange } />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => <Numbers key={ person.id } name={ person.name } />)}
      </div>
    </div>
  )
}

export default App