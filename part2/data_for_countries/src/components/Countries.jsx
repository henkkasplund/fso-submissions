import Country from './Country'
import { useState } from 'react'


const Countries = ({ countries, countrySearch }) => {
  const [clickedCountry, setClickedCountry] = useState(null)

  if (countrySearch === '') {
    return (
      <div>
        Start by typing in the search field above.
      </div>
    )
  }
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter.
      </div>
    )
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => 
          <li key={ country.cca3 }>{ country.name.common }
            <button onClick={() => setClickedCountry(country)}>Show</button>
          </li>
        )}
        {clickedCountry && <Country country={ clickedCountry } />}
      </div>
    )
  }

  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }

  return (
    <div>
      No countries match your search.
    </div>
  )
}

export default Countries