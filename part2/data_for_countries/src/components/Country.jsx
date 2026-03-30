import Weather from './Weather'

const Country = ({ country }) => {
  const languages = Object.values(country.languages)
  return (
    <div>
      <h1>{ country.name.common }</h1>
      <p>
        capital: { country.capital }<br />
        area: { country.area }
      </p>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => <li key={ language }>{ language }</li>)}
      </ul>
      <img src={ country.flags.png } alt={ country.flags.alt }/>
      <h2>Weather in { country.capital }</h2>
      <Weather capital={ country.capital } />
    </div>
  )
}

export default Country