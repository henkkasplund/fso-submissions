import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const Body = ({clicks}) => {
  return (
    <p>
      good {clicks[0]} <br />
      neutral {clicks[1]} <br />
      bad {clicks[2]} <br />
    </p>
  )
}

const App = () => {
  const header = 'give feedback'
  const subHeader = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }
  const allClicks = () => [good, neutral, bad]

  return (
    <div>
      <Header text={header} />
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Header text={subHeader} />
      <Body clicks={allClicks()}/>
    </div>
  )
}

export default App