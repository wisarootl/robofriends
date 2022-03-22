import React, { useState, useEffect } from 'react'
import CardList from '../components/CardList'
// import { robots } from './robots'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'

function App() {
  // constructor() {
  //   super()
  //   this.state = {
  //     robots: [],
  //     searchField: ''
  //   }
  // }
  const [robots, setRobots] = useState([])
  const [searchfield, setSearchfield] = useState('')

  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => response.json())
  //     .then((users) => this.setState({ robots: users }))
  // }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users))
  }, [])

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase())
  })
  if (!robots.length) {
    return <h1>loading</h1>
  } else {
    return (
      <div className="tc">
        <h1 className="f1">Robofriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    )
  }
}

export default App
