import { useState, useEffect } from 'react'
import FilterContacts from './components/FilterContacts'
import contactService from './services/persons'

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCriteria, setSearchCriteria] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContacts) => {
        setContacts(initialContacts)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Both name and number have to be added')
      return
    }
    if (contacts.some((contact) => contact.name.toLowerCase() === newName.trim().toLowerCase())) {
      alert(`${newName} has already been added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    contactService
      .add(contactObject)
      .then((returnedContact) => {
        setContacts(contacts.concat(returnedContact))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${ name }?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setContacts(contacts.filter((contact) => contact.id !== id))
        })
      }
    }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add new contact</h2>
      <form onSubmit={ addContact } >
        <div>
          name: <input value={ newName } onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={ newNumber } onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Search</h2>
      <div>
        filter by name: <input value={ searchCriteria } onChange={(event) => setSearchCriteria(event.target.value)} />
      </div>
      <h2>Contacts</h2>
        <FilterContacts contacts={ contacts } criteria={ searchCriteria } handleDelete={ handleDelete } />
    </div>
  )
}

export default App