import { useState } from 'react'

const Statistics = ({stats}) => {
  if (stats === 1) return <p>has {stats} vote</p>
  return <p>has {stats} votes</p>
}

const Anecdote = ({anecdote, stats}) => {
  return (
    <div>
      {anecdote}
      <Statistics stats={stats} />
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const mostVotes = votes.indexOf(Math.max(...votes))
  const updateSelected = (anecdotes) => {
    let next = selected
    while (next == selected) {
      next = Math.floor(Math.random() * anecdotes.length)
    }
    return next
  }
  const handleAnecdote = () => {
    setSelected(updateSelected(anecdotes))
  }
  const handleVote = () => {
    const updatedVotes = [...votes]
    updatedVotes[selected] += 1
    setVotes(updatedVotes)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} stats={votes[selected]} />
      <Button onClick={handleVote} name='vote' />
      <Button onClick={handleAnecdote} name='next anecdote' />
      <Header text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[mostVotes]} stats={votes[mostVotes]} />
    </div>
  )
}

export default App