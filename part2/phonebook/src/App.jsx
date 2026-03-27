import { useState, useEffect } from 'react'
import FilterContacts from './components/FilterContacts'
import contactService from './services/persons'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [contacts, setContacts] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCriteria, setSearchCriteria] = useState('')
  const [message, setMessage] = useState({ text: null, nature: null })

  useEffect(() => {
    contactService
      .getInitialContacts()
      .then((initialContacts) => {
        setContacts(initialContacts)
      })
  }, [])

  const createMessage = (text, nature) => {
    setMessage({ text, nature })
      setTimeout(() => {
        setMessage({ text: null, nature: null })
      }, 5000)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (newName.trim() === '' || newNumber.trim() === '') {
      createMessage('Both name and number have to be added', 'error')
      return
    }
    const duplicateContact = contacts.find(
      (contact) => contact.name.toLowerCase() === newName.trim().toLowerCase()
    )
    if (duplicateContact) {
      window.confirm(`${newName} has already been added to phonebook, replace the old number with the new?`)
        ? handleUpdate(duplicateContact)
        : setNewName(''), setNewNumber('')
      return
    }
    const contactObject = {
      name: newName,
      number: newNumber,
    }
    contactService
      .addContact(contactObject)
      .then((returnedContact) => {
        setContacts(contacts.concat(returnedContact))
        createMessage(`${ returnedContact.name } successfully added to phonebook.`, 'success')
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        console.error(error)
        createMessage(`An error occurred: ${ contactObject.name } was NOT added to phonebook.`, 'error')
      })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${ name }?`)) {
      contactService
        .deleteContact(id)
        .then(() => {
          setContacts(contacts.filter((contact) => contact.id !== id))
          createMessage(`${ name } successfully deleted from phonebook.`, 'success')
        })
        .catch((error) => {
          console.error(error)
          const errorCode = error.response ? error.response.status : undefined
          errorCode === 404
            ? createMessage(`${ name } has already been removed from server`, 'error')
            : createMessage(`An error occurred: Unable to delete ${ name } from phonebook`, 'error')
        })
      }
  }

  const handleUpdate = (duplicateContact) => {
    contactService
      .updateContact(duplicateContact, newNumber)
      .then((returnedContact) => {
        setContacts(contacts.map((contact) => contact.id === duplicateContact.id
          ? returnedContact
          : contact))
        createMessage(`${ returnedContact.name } successfully updated in phonebook`, 'success')
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        console.error(error)
        const errorCode = error.response ? error.response.status : undefined
        errorCode === 404
          ? createMessage(`${ duplicateContact.name } no longer exists on server`, 'error')
          : createMessage(`An error occurred: ${ duplicateContact.name } was NOT updated`, 'error')
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification text={ message.text } nature={ message.nature }/>
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