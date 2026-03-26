import Contact from './Contact'

const Contacts = ({ contacts, handleDelete}) => {
  return (
    <table>
      <tbody>
        {contacts.map((contact) => 
          <Contact key={ contact.id }
            name={ contact.name }
            number={ contact.number }
            id ={ contact.id }
            handleDelete={ handleDelete} /> )}
      </tbody>
    </table>
  )
}

export default Contacts