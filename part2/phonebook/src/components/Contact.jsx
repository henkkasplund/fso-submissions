const Contact = ({id, name, number, handleDelete }) => {
  return (
    <tr>
      <td>{ name }</td>
      <td>{ number }</td>
      <td><button onClick={() => handleDelete(id, name) }>delete</button></td>
    </tr>
  )
}

export default Contact