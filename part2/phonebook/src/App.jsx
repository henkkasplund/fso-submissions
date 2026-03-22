import { useState } from 'react'

const FilterContacts = ({ contacts, criteria }) => {
  return (
    criteria === '' ? <Contacts contacts={ contacts } /> : <Contacts contacts={contacts.filter((contact) => 
      contact.name.toLowerCase().includes(criteria.toLowerCase()))} />
  )
}

const Contact = ({name, number }) => {
  return (
    <tr>
      <td>{ name }</td>
      <td>{ number }</td>
    </tr>
  )
}

const Contacts = ({ contacts }) => {
  return (
    <table>
      <tbody>
        {contacts.map((contact) => <Contact key={ contact.id } name={ contact.name } number={ contact.number } /> )}
      </tbody>
    </table>
  )
}

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Arto Hellas', number: '0403902920' }
]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCriteria, setSearchCriteria] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      alert('Both name and number have to be added')
      return
    }
    if (contacts.some((contact) => contact.name === newName)) {
      alert(`${newName} has already been added to phonebook`)
      setNewName('')
      return
    }
    const contactObject = {
      id: contacts.length +1,
      name: newName,
      number: newNumber,
    }
    setContacts(contacts.concat(contactObject))
    setNewName('')
    setNewNumber('')
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