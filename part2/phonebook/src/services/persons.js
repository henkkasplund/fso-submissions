import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getInitialContacts = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const addContact = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`${ baseUrl }/${ id }`)
}

const updateContact = (contact, updatedNumber) => {
    const changedContact = {...contact, number: updatedNumber}
    const request = axios.put(`${ baseUrl }/${ contact.id }`, changedContact)
    return request.then((response) => response.data)
}

export default { getInitialContacts, addContact, deleteContact, updateContact }