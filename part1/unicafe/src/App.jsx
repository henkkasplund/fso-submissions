import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({clicks, all}) => {
  let good = clicks[0]
  let neutral = clicks[1]
  let bad = clicks[2]
  const averageP1 = (p1, p2, p3) => (p1 - p2) / p3
  const percentageP1 = (p1, p2) => (p1 / p2) * 100
  if (all > 0) {
    const average = averageP1(good, bad, all)
    const positive = percentageP1(good, all)
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    )
  }
  else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
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
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Header text={subHeader} />
      <Statistics clicks={allClicks()} all={total} />
    </div>
  )
}

export default App