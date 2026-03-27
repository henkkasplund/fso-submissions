import Country from './Country'

const Countries = ({ countries, countrySearch }) => {
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
        {countries.map((country) => <li key={ country.cca3 }>{ country.name.common }</li>)}
      </div>
    )
  }
  if (countries.length === 1) {
    return (
      <div>
        <Country country={ countries[0] } />
      </div>
    )
  }
  return (
    <div>
      No countries match your search.
    </div>
  )
}

export default Countries