import { useState, useEffect } from 'react'
import countryService from './services/countries'
import FilterCountries from './components/FilterCountries'

const App = () => {
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countryService
      .getInitialCountries()
      .then((initialCountries) => {
        setCountries(initialCountries)
      })
  }, [])

  if (!countries) {
    return null
  }

  return (
    <div>
      find countries <input value={ countrySearch } onChange={(event) => setCountrySearch(event.target.value)} />
      <FilterCountries countrySearch={ countrySearch } countries={ countries } />
    </div>
  )

}

export default App