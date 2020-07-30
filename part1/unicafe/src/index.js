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

const Statistics = ({counters}) => {
  const average = counters[4]

  const countAverage = () => {
    let x;
    let sum = 0
    for (x in average) {
      sum += average[x]
    }
    if (average.length === 0) {
      return 0
    } 
    return sum/average.length
  }

  const countPositive = () => {
    let x
    let count = 0
    for (x in average) {
      if (average[x] === 1) {
        count += average[x]
      }
    }
    if (average.length === 0) {
      return "0 %"
    } 
    return String(count/average.length * 100) + " %"
  }
  if (average.length === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{counters[0]}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{counters[1]}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{counters[2]}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{counters[3]}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{countAverage()}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{countPositive()}</td>
          </tr>
        </tbody>
      </table>
    )
}


const App = () => {
  const title = "give feedback"
  const statistics = "statistics"
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState([])

  const increaseGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average.concat(1))
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage(average.concat(0))
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average.concat(-1))
  }

  return (
    <div>
      <Title title={title}/>
      <Button handleClick={increaseGood} text="good"/>
      <Button handleClick={increaseNeutral} text="neutral"/>
      <Button handleClick={increaseBad} text="bad"/>
      <Title title={statistics}/>
      <Statistics counters={[good, neutral, bad, all, average]}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)