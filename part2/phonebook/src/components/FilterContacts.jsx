import Contacts from './Contacts'

const FilterContacts = ({ contacts, criteria, handleDelete }) => {
  return (
    criteria === '' ? <Contacts contacts={ contacts } handleDelete={ handleDelete }/> : <Contacts contacts={contacts.filter((contact) => 
      contact.name.toLowerCase().includes(criteria.toLowerCase()))} />
  )
}

export default FilterContacts