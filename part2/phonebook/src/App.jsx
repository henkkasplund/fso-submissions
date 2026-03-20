import { useState } from 'react'

const Contact = ({ name, number }) => <div>{ name } { number }</div>

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-3798290', important: true}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber ] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (contacts.some((contact) => contact.name === newName)) {
      alert(`${ newName } is already added to phonebook`)
      setNewName('')
      return
    }
    if (newName === '' || newNumber === '') {
      alert('Both name and number have to be added')
      return
    }
    const contactObject = {
      id: contacts.length +1,
      name: newName,
      number: newNumber,
      important: Math.random() > 0.5
    }
    setContacts(contacts.concat(contactObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ addContact }>
        <div>
          name: <input value={ newName } onChange={ handleNameChange } />
        </div>
        <div>
          number: <input value={ newNumber } onChange={ handleNumberChange } />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {contacts.map((contact) => <Contact key={ contact.id } name={ contact.name } number={ contact.number } />)}
      </div>
    </div>
  )
}

export default App