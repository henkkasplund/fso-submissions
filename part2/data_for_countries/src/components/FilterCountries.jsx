import Countries from './Countries'

const FilterCountries = ({ countrySearch, countries }) => {
  return (
    <Countries countrySearch={ countrySearch } countries={countries.filter((country) => 
    country.name.common.toLowerCase().includes(countrySearch.toLowerCase()))} />
  )
}

export default FilterCountries