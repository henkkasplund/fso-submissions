import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterContacts from './components/FilterContacts'

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCriteria, setSearchCriteria] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setContacts(response.data)
      })
      .catch(error => {
        alert(`Pyyntö epäonnistui: ${ error.message }`)
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
      return
    }
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    axios
      .post('http://localhost:3001/persons', contactObject)
      .then((response) => {
        setContacts(contacts.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        alert(`Kohteen vieminen tietokantaan epäonnistui. ${ error.message }`)
      })
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
        <FilterContacts contacts={ contacts } criteria={ searchCriteria } />
    </div>
  )
}

export default App