import React, { Component } from 'react'
import Cell from './Cell'
import Knight from './Knight'
import 'whatwg-fetch'
import './App.css'

const letters = 'ABCDEFGH'
const api = 'http://localhost:3001/api/move'

const columns = []
for (let i = 0; i < 8; i++) {
  const cell = []
  for (let j = 0; j < 8; j++) {
    cell.push(`${letters[i]}${8-j}`)
  }
  columns.push(cell)
}

class Board extends Component {

  constructor(props) {
    super(props)
    this.state = {
        initialPosition: '',
        nextPositions: []
    }
  }
  setInitialPosition (selectedCell) {
    this.setState({ initialPosition: selectedCell, nextPositions: [] })
  }

  getNextPositions () {
    const { initialPosition } = this.state

    fetch(`${api}?position=${initialPosition}`, {
    }).then(nextPositions => nextPositions.json())
      .then(next => this.setState({ nextPositions: next }))
    .catch((err) => {
      console.error(err)
    })
  }

  shouldHighlight(cell) {
    const { nextPositions } = this.state
    return nextPositions.indexOf(cell) > -1
  }

  render () {
    const { initialPosition } = this.state
    
    return (
      <div className="App">
          {columns.map(column =>
            <div className="Board-column" key={column}>
              {column.map(cell => {
                return (
                  <div className="Board-cell" key={cell} onClick={() => this.setInitialPosition(cell)}>
                    <Cell id={cell} selected={initialPosition === cell} highlight={this.shouldHighlight(cell) ? 'highlight' : ''}>
                      <Knight />
                    </Cell>
                  </div>
                )
              })}
            </div>
          )}
          <div className="Button">
            <button disabled={!this.state.initialPosition} onClick={() => this.getNextPositions()}>Próximas</button>
          </div>
      </div>
    );
  }
}

export default Board
