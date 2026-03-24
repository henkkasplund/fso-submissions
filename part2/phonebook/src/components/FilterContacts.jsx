import Contacts from './Contacts'

const FilterContacts = ({ contacts, criteria }) => {
  return (
    criteria === '' ? <Contacts contacts={ contacts } /> : <Contacts contacts={contacts.filter((contact) => 
      contact.name.toLowerCase().includes(criteria.toLowerCase()))} />
  )
}

export default FilterContacts