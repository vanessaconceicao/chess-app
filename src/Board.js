import React, { Component } from 'react'
import Cell from './Cell'
import Knight from './Knight'
import 'whatwg-fetch'
import './Board.css'

const letters = 'ABCDEFGH'
const api = 'http://localhost:3001/api/move'

const columns = []
for (let i = 0; i < 8; i++) {
  const cell = []
  for (let j = 0; j < 8; j++) {
    cell.push(`${letters[i]}${8 - j}`)
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

  setInitialPosition(selectedCell) {
    this.setState({ initialPosition: selectedCell, nextPositions: [] })
  }

  getNextPositions() {
    const { initialPosition } = this.state

    fetch(`${api}?position=${initialPosition}`, {})
      .then(nextPositions => nextPositions.json())
      .then(next => this.setState({ nextPositions: next }))
      .catch(err => {
        console.error(err)
      })
  }

  shouldHighlight(cell) {
    const { nextPositions } = this.state
    return nextPositions.indexOf(cell) > -1
  }

  oddColumnColor(colIndex) {
    return colIndex % 2 === 0 ? 'light' : 'dark'
  }

  evenColumnColor(colIndex) {
    return colIndex % 2 === 0 ? 'dark' : 'light'
  }

  render() {
    const { initialPosition } = this.state

    return (
      <div className="container">
        <header>Valid Chess Moves: Knight</header>
        <div className="board">
          {columns.map((column, colIndex) => {
            const evenColor = this.evenColumnColor(colIndex)
            const oddColor = this.oddColumnColor(colIndex)
            return (
              <div className="board-column" key={column}>
                {column.map((cell, cellIndex) => {
                  const color = cellIndex % 2 === 0 ? evenColor : oddColor
                  return (
                    <div
                      className={`board-cell ${color}`} key={cell}
                      onClick={() => this.setInitialPosition(cell)}>
                      <Cell
                        id={cell}
                        selected={initialPosition === cell}
                        highlight={
                          this.shouldHighlight(cell) ? 'highlight' : ''
                        }>
                        <Knight />
                      </Cell>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        <button
          className="button"
          disabled={!initialPosition}
          onClick={() => this.getNextPositions()}>
          Next Positions
        </button>
      </div>
    )
  }
}

export default Board
