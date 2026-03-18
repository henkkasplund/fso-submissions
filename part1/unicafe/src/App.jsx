import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const Body = ({clicks, totals}) => {
  let good = clicks[0]
  let neutral = clicks[1]
  let bad = clicks[2]
  let average = 0
  let positive = 0
  if (totals > 0) {
    average = (good - bad) / totals
    positive = (good / totals) * 100
  }
  return (
    <p>
      good {good} <br />
      neutral {neutral} <br />
      bad {bad} <br />
      total {totals} <br />
      average {average} <br />
      positive {positive}
    </p>
  )
}

const App = () => {
  const header = 'give feedback'
  const subHeader = 'statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
  }
  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
  }
  const allClicks = () => [good, neutral, bad]

  return (
    <div>
      <Header text={header} />
      <Button onClick={handleGood} text='good'/>
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Header text={subHeader} />
      <Body clicks={allClicks()} totals={total}/>
    </div>
  )
}

export default App