import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const title = "Anecdote of the day"
  const title2 = "Anecdote with most votes"

  const selectRandom = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const addVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotes = () => {
    let currentValue = 0
    let currentIndex = 0
    let x
    for (x in points) {
      if (points[x] > currentValue) {
        currentValue = points[x]
        currentIndex = x
      }
    }
    return [anecdotes[currentIndex], points[currentIndex]]
  }

  return (
    <div>
      <Title title={title}/>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={addVote} text="vote"/>
      <Button handleClick={selectRandom} text="next anecdote"/>
      <Title title={title2}/>
      <p>{mostVotes()[0]}</p>
      <p>has {mostVotes()[1]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)