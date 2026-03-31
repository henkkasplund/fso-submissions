const persons = require('./persons')
const info = () => {
  return (
    `
      <p>Phonebook has info for ${ persons.length } people</p>
      <p>${ new Date() }</p>`
  )
}

module.exports = info