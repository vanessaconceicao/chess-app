import React, { Component } from 'react'
import './App.css'
import Cell from './Cell'
import Knight from './Knight'

const letters = 'ABCDEFGH'

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
    this.setState({ initialPosition: selectedCell })
  }

  getNextPositions () {
    const { initialPosition, nextPositions } = this.state
    //implement fetch
    //const nextPositions = fetch()
    this.setState({ nextPositions: ['A1', 'B5', 'A8', 'C4', 'D8', 'G2'] })
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
